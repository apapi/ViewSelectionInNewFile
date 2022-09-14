// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ViewSelectionInNewFile" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('extension.ViewSelectionInNewFile', (editor, edit) => {
		// The code you place here will be executed every time your command is executed

		let selection = editor.document.getText(editor.selection.with());
		let lang = getLanguage(selection);
		vscode.workspace.openTextDocument({ "content": selection, "language": lang }).then(doc => {
			return vscode.window.showTextDocument(doc);
		}).then(() =>
			vscode.commands.executeCommand("editor.action.formatDocument"));
	});

	context.subscriptions.push(disposable);
}

function getLanguage(content: string) {
	let tc = content.trim();
	if (tc.startsWith("{") && tc.endsWith("}")) {
		return 'json';
	} else if (tc.startsWith("[") && tc.endsWith("]")) {
		return 'json';
	} else if (tc.startsWith("<") && tc.endsWith(">")) {
		return 'xml';
	} else {
		return 'txt';
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
