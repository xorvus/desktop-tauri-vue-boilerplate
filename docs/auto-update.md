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

###### src/App.vue
```typescript
import {check} from "@tauri-apps/plugin-updater";
import {relaunch} from "@tauri-apps/plugin-process";

const update = await check({
    headers: {
        Authorization: "Bearer xxxxxxx",
        Accept: "application/octet-stream"
    }
});

if (update) {
    console.log(
        `found update ${update.version} from ${update.date} with notes ${update.body}`
    );
    let downloaded = 0;
    let contentLength = 0;
    // alternatively we could also call update.download() and update.install() separately
    await update.downloadAndInstall((event) => {
        switch (event.event) {
            case 'Started':
                contentLength = event.data.contentLength;
                console.log(`started downloading ${event.data.contentLength} bytes`);
                break;
            case 'Progress':
                downloaded += event.data.chunkLength;
                console.log(`downloaded ${downloaded} from ${contentLength}`);
                break;
            case 'Finished':
                console.log('download finished');
                break;
        }
    });

    console.log('update installed');
    await relaunch();
}

```


### Permissions
by default, all plugin commands are blocked and cannot be accessed. You must define a list of permissions in your capabilities configuration.

###### src-tauri/capabilities/default.json
``` json

{
  "permissions": [
    ...
    "updater:default",
    "process:default",
  ]
}
```

### Referance
[Updater](https://tauri.app/plugin/updater/)
[Process](https://tauri.app/plugin/process/)

