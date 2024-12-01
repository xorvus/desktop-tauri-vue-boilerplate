## Store

Store is a simple key-value store that uses JSON file to store data. It is used to store application settings and other data that needs to be persisted between app launches.

### Usage



### Permissions
###### src-tauri/capabilities/default.json
``` json
{
  "permissions": [
    ...,
    "store:default",
  ]
}
```

### Reference
[Store](https://v2.tauri.app/plugin/store)