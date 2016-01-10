# HTTP Public Key Pinning

Plugin made for Google Chrome where the user can manually associate public keys with a certain web server
without the web server sending out the HPKP header

Web service to get the pin is located [here](https://github.com/redpois0n/hpkp-enforcer-web), you might also want to
visit [report-uri.io](https://report-uri.io)

Since Chrome requires atleast 2 pins, and the second one is required to be outside the first certificate chain, we cannot get retrieve any valid pin for this, so we use a fake one. See below.

## Generating the fake backup pin

```
$ echo "" | openssl dgst -sha256 -binary | base64 > fake.pin
```
