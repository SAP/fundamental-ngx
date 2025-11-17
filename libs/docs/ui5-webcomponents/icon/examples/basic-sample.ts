import { Component, signal } from '@angular/core';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

// Import Fundamental Styles
import 'fundamental-styles/dist/paddings.css';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/add.js';
import '@ui5/webcomponents-icons/dist/delete.js';
import '@ui5/webcomponents-icons/dist/edit.js';
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/save.js';
import '@ui5/webcomponents-icons/dist/settings.js';

@Component({
    selector: 'ui5-icon-basic-example',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Icon, Label]
})
export class IconBasicExample {
    readonly basicIcons = signal([
        { name: 'employee', label: 'employee' },
        { name: 'add', label: 'Add' },
        { name: 'delete', label: 'Delete' },
        { name: 'edit', label: 'Edit' },
        { name: 'save', label: 'Save' },
        { name: 'settings', label: 'Settings' }
    ]);
}
