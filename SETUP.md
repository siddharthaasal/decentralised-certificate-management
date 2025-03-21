dfx start --background
dfx deploy
replace the cannister's id

5fqta-h3gin-7kic5-tankp-jqu7d-7dv6p-n2tlw-vlzel-4vjo7-tknve-hqe

okxwn-4x732-ddu5g-qtjvg-xqqa4-zomtk-tyiaq-b33us-6vdc7-6tdfj-4qe

 <!-- dfx canister call CertificateRegistry issueCertificate \
'("Siddharth","5fqta-h3gin-7kic5-tankp-jqu7d-7dv6p-n2tlw-vlzel-4vjo7-tknve-hqe", "QmTz5xxxxxxxxyzABCD123456789")'
(
  "5fqta-h3gin-7kic5-tankp-jqu7d-7dv6p-n2tlw-vlzel-4vjo7-tknve-hqe-1742534455141818023",
) -->


dfx canister call CertificateRegistry issueCertificate
'("Siddharth", principal "5fqta-h3gin-7kic5-tankp-jqu7d-7dv6p-n2tlw-vlzel-4vjo7-tknve-hqe", "QmTz5xxxxxxxxyzABCD123456789")'

dfx canister call CertificateRegistry verifyCertificate '("5fqta-h3gin-7kic5-tankp-jqu7d-7dv6p-n2tlw-vlzel-4vjo
7-tknve-hqe-1742534455141818023")'



cd <frontend-dir>
npm start