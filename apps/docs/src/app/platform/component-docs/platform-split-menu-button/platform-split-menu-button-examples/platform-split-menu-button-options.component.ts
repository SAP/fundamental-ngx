import { Component } from '@angular/core';

@Component({
    selector: 'split-menu-button-options',
    templateUrl: 'platform-split-menu-button-options.component.html',
})
export class PlatformDocsSplitMenuButtonOptionsComponent {
    selectedCozyItem: string;
    selectedCompactItem: string;
    label: string = 'Default Action';
    buttonTypes = ['standard', 'positive', 'negative', 'ghost', 'transparent', 'emphasized'];

    public onItemSelectCozy(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
    }

    public onPrimaryButtonClickCozy(): void {
        this.selectedCozyItem = this.label;
    }

    public onItemSelectCompact(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
    }

    public onPrimaryButtonClickCompact(): void {
        this.selectedCompactItem = this.label;
    }
}
