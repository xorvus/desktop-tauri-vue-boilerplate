## Versioning App

To change version app you must change the version in the `package.json` file and the `tauri.conf.json` file.

### tauri.conf.json

```json
{
  ....
  "version": "0.1.0",
  ....
}
```


### package.json (Optional)

```json
{
  ....
  "version": "0.1.0",
  ....
}
```


#### To show the version in the app you can use the following code:

```typescript
import { invoke } from "@tauri-apps/api/core";

const version = await invoke("get_version");
console.log(version);
```