import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Int "mo:base/Int"; // Fixes the Int module error
import Iter "mo:base/Iter";
import List "mo:base/List";
import Array "mo:base/Array"

actor CertificateRegistry {
  type Certificate = {
    name : Text;
    issuer : Principal;
    recipient : Principal;
    ipfsHash : Text;
    issueDate : Int;
    isValid : Bool;
  };

  // Stable storage workaround using an array
  stable var storedCertificates : [(Text, Certificate)] = [];

  // HashMap for fast lookups (not stable)
  let certificates = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);

  // On start, restore the stable data
  system func preupgrade() {
    storedCertificates := Iter.toArray(certificates.entries());
  };

  system func postupgrade() {
    for ((certId, cert) in storedCertificates.vals()) {
      certificates.put(certId, cert);
    };
  };

  public func issueCertificate(name : Text, recipient : Principal, ipfsHash : Text) : async Text {
    let certId = Principal.toText(recipient) # "-" # Int.toText(Time.now());
    let cert : Certificate = {
      name = name;
      issuer = Principal.fromActor(CertificateRegistry); // FIXED HERE
      recipient = recipient;
      ipfsHash = ipfsHash;
      issueDate = Time.now();
      isValid = true;
    };
    certificates.put(certId, cert);
    return certId;
  };

  public query func verifyCertificate(certId : Text) : async Bool {
    switch (certificates.get(certId)) {
      case (?cert) { true };
      case null { true };
    };
  };

  public func revokeCertificate(certId : Text) : async Bool {
    switch (certificates.get(certId)) {
      case (?cert) {
        certificates.put(certId, { cert with isValid = false });
        true;
      };
      case null { false };
    };
  };

  public query func getCertificate(certId : Text) : async ?Certificate {
    certificates.get(certId);
  };

  public query func getCertificatesForUser(userPrincipal : Principal) : async [Certificate] {
    var userCerts = List.nil<Certificate>(); // Start with an empty list

    for (cert in certificates.vals()) {
      if (cert.recipient == userPrincipal) {
        userCerts := List.push(cert, userCerts); // Push matching certs to the list
      };
    };

    return List.toArray(userCerts); // Convert List to Array before returning
  };

};
