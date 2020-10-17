---
layout: post
title: "Signing Code with Yubikey"
date: 2020-10-17
---

I definitely ripped most of this from here with a few caveats:
[link](https://eclipsesource.com/blogs/2016/11/25/yubikey-code-signing-with-a-smart-card/)

I made this guide because:

1. Seems like parameter order may have updated, APDU errors appeared for me from this guide (I work on standard Ubuntu 18.04). Debugging the APDU errors were elusive. So if you have debugging tips, tweet em at me
2. PIV Manager Distribution on Ubuntu in particular was varied, I used the GUI manager because my configuration wasn't playing well. But I had to use an app image that was for 16.04+ Ubuntu, and not the standard download. *shrug*

From Yubico:
[link](https://support.yubico.com/hc/en-us/articles/360016649039-Enabling-the-Yubico-PPA-on-Ubuntu)
>"Note that yubikey-manager-qt is unavailable for Ubuntu 16.04 in our PPA, due to that version of Ubuntu lacking an up-to-date Qt library. If you are running 16.04, you will need to use the AppImage of YubiKey Manager available [here](https://developers.yubico.com/yubikey-manager-qt/Releases/yubikey-manager-qt-latest-linux.AppImage) instead. The command-line yubikey-manager is available for 16.04 in our PPA, however."

My short guide for code signing with Yubikey is listed below. It's not very extensive on the Yubikey end, because I am no expert on the nuances of PIV-Compliant smart card configuration. But the GUI Tool made it very easy to navigate.

## Configure Yubikey

1. Tools needed:
   - [YubiKey-PIV-Tool](https://developers.yubico.com/yubico-piv-tool/)
   - [YubiKey-PIV-Manager](https://developers.yubico.com/yubikey-piv-manager/)
   - [OpenSC](https://github.com/OpenSC/OpenSC/wiki/Download-latest-OpenSC-stable-release)
2. Change the default PIN and PUK.

## Generate Keys

   1. Once configured, you can now generate a public / private key pair.
   2. Generate the pair on slot 9c (Digital Signature).
   3. Generate Public Key and save output (ex: pub.pem)
      `pkcs15-tool --read-public-key 02`
      - Note, private key is only accessible through applet on the smart card

## Example signing

```bash
openssl dgst -sha256 -binary <file> > <file>.sha256

pkcs15-crypt -s -k 02 --sha-256 -i <file>.sha256 -o <signature-file> -f openssl

openssl dgst -sha256 -verify <public key> -signature <signature file> <file>
```

## Line by Line Translation

1. Use OpenSSL to generate a hash of the file from it's binary form
2. PIV Tool's `pkcs15-crypt` is called here to sign the hash, reference they key slot to find your Yubikey, and output the signature
3. With OpenSSL, verify the hash with the public key you generated

Hope this helped someone out there!
