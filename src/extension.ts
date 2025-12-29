// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders || workspaceFolders.length === 0) {
		return;
	}

	const rootPath = workspaceFolders[0].uri.fsPath;
	const goModPath = path.join(rootPath, 'go.mod');

	if (!fs.existsSync(goModPath)) {
		return;
	}

	try {
		const goModContent = fs.readFileSync(goModPath, 'utf8');
		const match = goModContent.match(/^module\s+(.+)$/m);
		if (!match || !match[1]) {
			return;
		}
		const moduleName = match[1].trim();


		const config = vscode.workspace.getConfiguration();
		const inspect = config.inspect('gopls');
		const workspaceGoplsConfig = inspect?.workspaceValue || {};
		const goplsConfig = config.get<any>('gopls');

		// already set local module, skip
		if (goplsConfig && goplsConfig['formatting.local']) {
			return;
		}

		const newGoplsConfig = { ...workspaceGoplsConfig, 'formatting.local': moduleName };
		config.update('gopls', newGoplsConfig, vscode.ConfigurationTarget.Workspace)
			.then(() => {
				vscode.window.showInformationMessage(`[Go Local Imports] gopls configuration updated to use local module: ${moduleName}`);
			}, (error) => {
				vscode.window.showErrorMessage(`[Go Local Imports] Error updating gopls configuration:`, error);
			});
	} catch (error) {
		console.error('[Go Local Imports] Error updating gopls configuration:', error);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
