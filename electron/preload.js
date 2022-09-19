// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");

process.once("loaded", () => {
    contextBridge.exposeInMainWorld("versions", process.versions);

    contextBridge.exposeInMainWorld('cmdEvents', {
        execCommand: (command) => ipcRenderer.send('command', command),
        onCommandSuccess: (callback) => ipcRenderer.on('command:succ', callback),
        onCommandError: (callback) => ipcRenderer.on('command:stderr', callback),
        onError: (callback) => ipcRenderer.on('command:err', callback),
        onExit: (callback) => ipcRenderer.on('command:exit', callback),
        removeAllListeners: () => {
            ipcRenderer.removeAllListeners('command:succ')
            ipcRenderer.removeAllListeners('command:stderr')
            ipcRenderer.removeAllListeners('command:err')
            ipcRenderer.removeAllListeners('command:exit')
        }
    })
});
