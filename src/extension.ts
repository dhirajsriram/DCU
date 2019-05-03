'use strict';

import * as vscode from 'vscode';
var fs = require('fs');
var terminal;
var userData = {
	node: '',
	username: '',
	password: ''
};
var NEXT_TERM_ID = 1;
export function activate(context: vscode.ExtensionContext) {
	//DCU set key
	vscode.commands.registerCommand('terminalTest.dcuset', async (uri: vscode.Uri) => {
		createTerminal();
		const fileLocation = uri.fsPath;
		if (vscode.workspace.workspaceFolders) {
			await askDetails('username');
			await askDetails('password');
			await askDetails('node');
			console.log(fileLocation);
			fs.writeFile(fileLocation+'/dculog.json', JSON.stringify(userData), function(err) {
				if (err) {
					return console.log(err);
				}
				vscode.window.showInformationMessage('DCU credentials saved ✔️');
				console.log('The file was saved!');
			});
		}
	});
}
//DCU put
vscode.commands.registerCommand('terminalTest.dcupush', (uri: vscode.Uri) => {
	createTerminal();
	const fileLocation = uri.fsPath;
	console.log(fileLocation);
	vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/dculog.json").then((document) => {
		let data = JSON.parse(document.getText());
		if (vscode.workspace.workspaceFolders) {
			terminal.sendText('dcu --put "' + fileLocation + '"' + " --username " +data["username"]+ " --password " +data["password"]+ " --node " + data["node"]);
			vscode.window.showInformationMessage('DCU pushed ✔️');
		}
	  }, (reason) => {
		  vscode.window.showErrorMessage("DCU credentials were not found");
	  });
});
//DCU putAll
vscode.commands.registerCommand('terminalTest.dcupushall', (uri: vscode.Uri) => {
	createTerminal();
	if (vscode.workspace.workspaceFolders) {
		const fileLocation = uri.fsPath;
		vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/dculog.json").then((document) => {
			let data = JSON.parse(document.getText());
			if (vscode.workspace.workspaceFolders) {
				terminal.sendText('dcu --putAll "' + fileLocation + '"' + " --username " +data["username"]+ " --password " +data["password"]+ " --node " + data["node"]);
				vscode.window.showInformationMessage('DCU pushed ✔️');
			}
		  }, (reason) => {
			  vscode.window.showErrorMessage("DCU credentials were not found");
		  });
	}
});
//DCU grab
vscode.commands.registerCommand('terminalTest.dcugrab', async () => {
	createTerminal();
	vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/dculog.json").then((document) => {
		let data = JSON.parse(document.getText());
		if (vscode.workspace.workspaceFolders) {
			terminal.sendText("dcu --grab --clean --username " +data["username"]+ " --password " +data["password"]+ " --node " + data["node"]);
			vscode.window.showInformationMessage('DCU grabbed ✔️');
		}
	  }, (reason) => {
		  vscode.window.showErrorMessage("DCU credentials were not found");
	  });
});
//DCU clean grab
vscode.commands.registerCommand('terminalTest.dcucleangrab', async () => {
	createTerminal();
	vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/dculog.json").then((document) => {
		let data = JSON.parse(document.getText());
		if (vscode.workspace.workspaceFolders) {
			terminal.sendText("dcu --grab  --username " +data["username"]+ " --password " +data["password"]+ " --node " + data["node"]);
			vscode.window.showInformationMessage('DCU grabbed ✔️');
		}
	  }, (reason) => {
		  vscode.window.showErrorMessage("DCU credentials were not found");
	  });
});

function createTerminal() {
	if (!vscode.window.activeTerminal) {
		terminal = vscode.window.createTerminal(`DCU Terminal`);
		terminal.show();
	} else {
		terminal = vscode.window.activeTerminal;
		terminal.show();
	}
}

const askDetails = (name) => {
	return new Promise((resolve, reject) => {
		vscode.window.showInputBox({ placeHolder: 'Enter the ' + name }).then((value) => {
			if (!value) {
				return;
			} else {
				userData[name] = value;
				resolve();
			}
		});
	});
};
