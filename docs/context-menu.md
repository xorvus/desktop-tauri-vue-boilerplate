## Context Menu

### Usage
```javascript
document.addEventListener('contextmenu', async (event) => {
    event.preventDefault(); // Prevent the default browser context menu
    const window = getCurrentWindow();
    const menu = await Menu.new({
        items: [
            { id: "reload", text: "Reload", action: () => refresh() },
            { item: "Separator" },
            { id: "version", enabled: false, text: `Version: ${await invoke("get_version")}` },
        ],
    });
    menu.popup(new PhysicalPosition(event.screenX,event.screenY), window).then()
});

```