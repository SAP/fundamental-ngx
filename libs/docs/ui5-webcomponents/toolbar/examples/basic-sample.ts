import { Component } from '@angular/core';
import { Toolbar } from '@fundamental-ngx/ui5-webcomponents/toolbar';
import { ToolbarButton } from '@fundamental-ngx/ui5-webcomponents/toolbar-button';

// Import used icons
import '@ui5/webcomponents-icons/dist/add.js';
import '@ui5/webcomponents-icons/dist/cancel.js';
import '@ui5/webcomponents-icons/dist/delete.js';
import '@ui5/webcomponents-icons/dist/edit.js';
import '@ui5/webcomponents-icons/dist/save.js';

@Component({
    selector: 'ui5-toolbar-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Toolbar, ToolbarButton]
})
export class ToolbarBasicSample {
    onActionClick(action: string): void {
        console.log('Action clicked:', action);
    }
}
