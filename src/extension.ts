'use strict';

import * as vscode from 'vscode';
var fs = require('fs');
var terminal;
var userData = {
	node:"",
	username:"",
	password:""
};
export function activate(context: vscode.ExtensionContext) {
	//DCU put
	vscode.commands.registerCommand('terminalTest.dcupush', (uri: vscode.Uri) => {
		createTerminal();
		const fileLocation = uri.fsPath;
		if (vscode.workspace.workspaceFolders) {
			terminal.sendText('dcu --put "' + fileLocation + '"');
			vscode.window.showInformationMessage('DCU pushed ✔️');
		}
	});
	//DCU set key
	vscode.commands.registerCommand('terminalTest.dcuset', () => {
		createTerminal();
		if (vscode.workspace.workspaceFolders) {
			vscode.window.showInputBox({ placeHolder: 'Enter the application key' }).then((value) => {
				if (!value) {
					return;
				} else {
					terminal.sendText('REG delete HKCU\\Environment /F /V CC_APPLICATION_KEY');
					terminal.sendText('setx CC_APPLICATION_KEY ' + value);
					vscode.window.showInformationMessage('DCU set with the application key ✔️');
				}
			});
		}
	});
	//DCU putAll
	vscode.commands.registerCommand('terminalTest.dcupushall', (uri: vscode.Uri) => {
		createTerminal();
		if (vscode.workspace.workspaceFolders) {
			const fileLocation = uri.fsPath;
			terminal.sendText('dcu --putAll "' + fileLocation + '"');
			vscode.window.showInformationMessage('DCU pushed ✔️');
		}
	});
	//DCU grab
	vscode.commands.registerCommand('terminalTest.dcugrab', async () => {
		createTerminal();

		if (vscode.workspace.workspaceFolders) {
			if (fs.existsSync(vscode.workspace.rootPath + '/.ccc')) {
				terminal.sendText('dcu --grab');
				vscode.window.showInformationMessage('DCU Grabbed ✔️');
			} else {
				await askDetails('username');
				await askDetails('password');
				await askDetails('node');
				terminal.sendText('dcu --grab --node ' +userData.node +' --username ' +userData.username +' --password ' +userData.password);
			}
		}
	});
}

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
