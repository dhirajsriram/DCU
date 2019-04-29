# DCU-Push

A VS code plugin that does a PUT operation onto the Orcale commerce cloud server

## Install

Look for DCU-push on the VS code marketplace and install the plugin 

## Usage

 Open the Command Palette (Ctrl+Shift+P) and type 'DCU Push' to push the current opened file onto the CC server.
 
 ## Snippet
 
 The extension runs the following command by default
 
 ```sh
 dcu --put "<filepath>" --node <node> --username <username> --password <password>
 ```
 
 The extension looks for a config.json in the directory by default and gets the config values from there
 
 ```json
 {
 "username":"abc",
 "password":"123",
 "node":"www.xyz.com"
 }
 ```
|   data  | Description|  type | source |
|---------|------------|----------|------|
|filepath|The location of the file to be pushed to using DCU |string| ``vscode.window.activeTextEditor.document.uri.fsPath``|
|username|The username of the user pushing the file|string|``config.json``|
|password|Password of the user|``config.json``|
|node|The CC instance to which the file needs to be pushed |string|``config.json``|
 
