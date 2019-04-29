'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let NEXT_TERM_ID = 1;

	console.log("Terminals: " + (<any>vscode.window).terminals.length);

	// vscode.window.onDidOpenTerminal
	vscode.window.onDidOpenTerminal(terminal => {
		console.log("Terminal opened. Total count: " + (<any>vscode.window).terminals.length);

		(<any>terminal).onDidWriteData(data => {
			console.log("Terminal data: ", data);
		});
	});
	// vscode.window.onDidChangeActiveTerminal
	vscode.window.onDidChangeActiveTerminal(e => {
		console.log(`Active terminal changed, name=${e ? e.name : 'undefined'}`);
	});

	// vscode.window.createTerminal

	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.dcu', () => {
        const terminal = vscode.window.createTerminal(`Ext Terminal #${NEXT_TERM_ID++}`);
        const fileLocation = vscode.window.activeTextEditor.document.uri.fsPath;
        terminal.sendText('dcu --put "'+fileLocation+'"--node https://ccadmin-prod-z4ua.oracleoutsourcing.com/ --username kathiravan.munusamy@taistech.com --password Petmate123');
        vscode.window.showInformationMessage('DCU pushed ✔️');
    }));



	// vvv Proposed APIs below vvv

	// vscode.window.onDidWriteData
}
