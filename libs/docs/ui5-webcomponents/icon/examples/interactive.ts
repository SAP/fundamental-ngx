import { Component, signal } from '@angular/core';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { IconMode } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

// Import all icons
import '@ui5/webcomponents-icons/dist/AllIcons.js';

@Component({
    selector: 'ui5-icon-interactive-example',
    templateUrl: './interactive.html',
    standalone: true,
    imports: [Icon, Label, Text, CheckBox]
})
export class IconInteractiveExample {
    readonly clickCount = signal(0);
    readonly lastClickedIcon = signal<string>('');
    readonly showTooltips = signal(true);
    readonly iconMode = signal<IconMode>(IconMode.Interactive);

    readonly interactiveIcons = signal([
        { name: 'add', label: 'Add Item', action: 'Add new item' },
        { name: 'delete', label: 'Delete Item', action: 'Delete selected item' },
        { name: 'edit', label: 'Edit Item', action: 'Edit current item' },
        { name: 'save', label: 'Save Changes', action: 'Save all changes' },
        { name: 'refresh', label: 'Refresh Data', action: 'Refresh the data' },
        { name: 'share', label: 'Share Content', action: 'Share this content' }
    ]);

    onIconClick(iconName: string, action: string): void {
        this.clickCount.update((count) => count + 1);
        this.lastClickedIcon.set(`${iconName} - ${action}`);
    }
}
