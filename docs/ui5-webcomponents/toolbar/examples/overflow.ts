import { Component, signal } from '@angular/core';
import { Toolbar } from '@fundamental-ngx/ui5-webcomponents/toolbar';
import { ToolbarButton } from '@fundamental-ngx/ui5-webcomponents/toolbar-button';

@Component({
    selector: 'ui5-toolbar-overflow-sample',
    templateUrl: './overflow.html',
    standalone: true,
    imports: [Toolbar, ToolbarButton]
})
export class ToolbarOverflowSample {
    actions = signal([
        'Create',
        'Edit',
        'Delete',
        'Copy',
        'Paste',
        'Cut',
        'Undo',
        'Redo',
        'Save',
        'Export',
        'Import',
        'Print',
        'Share',
        'Download',
        'Upload',
        'Refresh',
        'Settings',
        'Help'
    ]);

    onActionClick(action: string): void {
        console.log(`Action button clicked: ${action}`);
    }
}
