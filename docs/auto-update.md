## Auto Update

### Configuration

###### signer generate
```bash
bunx tauri signer generate -w ~/.tauri/myapp.key
```

###### environment
```dotenv
# Mac/Linux
export TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
# optionally also add a password
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""

# Windows
$env:TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
#optionally also add a password
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
```

###### src-tauri/tauri.conf.json
Will generate the update bundles and their signatures and will be used to verify the signature of the update bundle.
```json
{
  "bundle": {
    "createUpdaterArtifacts": true
  },
  "plugins": {
    "updater": {
      "pubkey": "CONTENT FROM PUBLICKEY.PEM",
      "endpoints": [
        "https://github.com/user/repo/releases/latest/download/latest.json"
      ],
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```
For guide type install mode on windows [installMode](https://tauri.app/plugin/updater/#installmode-on-windows)

###### example latest.json
```json
{
  "version": "0.1.2",
  "notes": "test note",
  "pub_date": "2024-11-21T01:27:04.574Z",
  "platforms": {
    "linux-x86_64": {
      "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXcHIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "url": "https://github.com/xxx/xxx/releases/download/0.1.2/example_0.1.2_amd64.AppImage"
    },
    "windows-x86_64": {
      "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXcHIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "url": "https://github.com/xxx/xxx/releases/download/0.1.2/example_0.1.2_amd64.exe"
    },
    "darwin-x86_64": {
      "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXcHIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "url": "https://github.com/xxx/xxx/releases/download/0.1.2/example_0.1.2_arm64.app.tar.gz"
    }
  }
}
```

### Usage



### Permissions
by default, all plugin commands are blocked and cannot be accessed. You must define a list of permissions in your capabilities configuration.

###### src-tauri/capabilities/default.json
``` json

{
  "permissions": [
    ...
    "updater:default",
  ]
}
```

### Referance
[Updater](https://tauri.app/plugin/updater/)


