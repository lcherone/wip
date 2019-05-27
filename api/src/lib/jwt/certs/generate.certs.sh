#!/bin/bash

# generate an RSA private key
openssl genrsa 2048 > private.key

# generate an RSA public key
openssl req -new -x509 -nodes -sha1 -days 365 -key private.key -out public.pem -subj "/C=GB/ST=London/L=London/O=IT/OU=IT Department/CN=acme-project.localhost"
