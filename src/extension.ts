'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let NEXT_TERM_ID = 1;


	// vscode.window.createTerminal

	vscode.commands.registerCommand('terminalTest.dcu', () => {
		const terminal = vscode.window.createTerminal(`Ext Terminal #${NEXT_TERM_ID++}`);
		const fileLocation = vscode.window.activeTextEditor.document.uri.fsPath;
		if (vscode.workspace.workspaceFolders) {
			vscode.workspace.workspaceFolders.forEach((folder) => {
				//new vscode.RelativePattern(folder, 'config.json')
				vscode.workspace.findFiles('**/config.json', '**/node_modules/**', 10).then((uris) => {
					uris.forEach((uri) => {
						vscode.workspace.openTextDocument(uri.path).then((document) => {
							let text = document.getText();
							let textJSON = JSON.parse(text);
							let username = textJSON.username;
							let password = textJSON.password;
							let node = textJSON.node;
							terminal.sendText(
								'dcu --put "' +
									fileLocation +
									'" --node ' + node+' --username '+username+' --password '+password
							);
							vscode.window.showInformationMessage('DCU pushed ✔️');
						  });
						
					});
				});
			});
		}
	})



	// vvv Proposed APIs below vvv

	// vscode.window.onDidWriteData
}
