import { Component, computed, signal } from '@angular/core';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';
import { Toolbar } from '@fundamental-ngx/ui5-webcomponents/toolbar';
import { ToolbarButton } from '@fundamental-ngx/ui5-webcomponents/toolbar-button';
import { ToolbarSelect } from '@fundamental-ngx/ui5-webcomponents/toolbar-select';
import { ToolbarSelectOption } from '@fundamental-ngx/ui5-webcomponents/toolbar-select-option';
import { ToolbarSeparator } from '@fundamental-ngx/ui5-webcomponents/toolbar-separator';
import { ToolbarSpacer } from '@fundamental-ngx/ui5-webcomponents/toolbar-spacer';
import type { UI5CustomEvent } from '@ui5/webcomponents-base';

// Import all icons
import '@ui5/webcomponents-icons/dist/AllIcons.js';

@Component({
    selector: 'ui5-toolbar-complex-sample',
    templateUrl: './complex.html',
    standalone: true,
    imports: [Toolbar, ToolbarButton, Title, ToolbarSelect, ToolbarSelectOption, ToolbarSpacer, ToolbarSeparator]
})
export class ToolbarComplexSample {
    selectedProject = signal<string>('Project Alpha');
    notifications = signal<number>(5);

    projects = signal(['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta']);

    notificationText = computed(() => `(${this.notifications()})`);

    onProjectChange(event: UI5CustomEvent<any, 'change'>): void {
        const selectedOption = event.detail.selectedOption;
        if (selectedOption) {
            console.log(`Project changed: ${selectedOption.textContent?.trim() || ''}`);
        }
    }

    onActionClick(action: string): void {
        console.log(`Action button clicked: ${action}`);
    }
}
