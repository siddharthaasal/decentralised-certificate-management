dfx start --background
dfx deploy
replace the cannister's id


dfx canister call CertificateRegistry issueCertificate \
'("Siddharth", principal "5fqta-h3gin-7kic5-tankp-jqu7d-7dv6p-n2tlw-vlzel-4vjo7-tknve-hqe", "QmTz5xxxxxxxxyzABCD123456789")'



cd <frontend-dir>
npm start