import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-split-menu-button-options',
    templateUrl: 'platform-split-menu-button-options.component.html'
})
export class PlatformDocsSplitMenuButtonOptionsComponent {
    selectedCozyItem: string;
    selectedCompactItem: string;

    labelCozy1 = 'Default Action';
    labelCozy2 = 'Default Action';
    labelCozy3 = '';
    labelCozy4 = '';

    labelCompact1 = 'Default Action';
    labelCompact2 = 'Default Action';
    labelCompact3 = '';
    labelCompact4 = '';

    public onItemSelectCozy1(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelCozy1 = menuItemValue;
    }

    public onPrimaryButtonClickCozy1(): void {
        this.selectedCozyItem = this.labelCozy1;
    }

    public onItemSelectCozy2(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelCozy2 = menuItemValue;
    }

    public onPrimaryButtonClickCozy2(): void {
        this.selectedCozyItem = this.labelCozy2;
    }

    public onItemSelectCozy3(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelCozy3 = menuItemValue;
    }

    public onPrimaryButtonClickCozy3(): void {
        this.selectedCozyItem = this.labelCozy3;
    }

    public onItemSelectCozy4(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelCozy4 = menuItemValue;
    }

    public onPrimaryButtonClickCozy4(): void {
        this.selectedCozyItem = this.labelCozy4;
    }

    public onItemSelectCompact1(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelCompact1 = menuItemValue;
    }

    public onPrimaryButtonClickCompact1(): void {
        this.selectedCompactItem = this.labelCompact1;
    }

    public onItemSelectCompact2(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelCompact2 = menuItemValue;
    }

    public onPrimaryButtonClickCompact2(): void {
        this.selectedCompactItem = this.labelCompact2;
    }

    public onItemSelectCompact3(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelCompact3 = menuItemValue;
    }

    public onPrimaryButtonClickCompact3(): void {
        this.selectedCompactItem = this.labelCompact3;
    }

    public onItemSelectCompact4(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelCompact4 = menuItemValue;
    }

    public onPrimaryButtonClickCompact4(): void {
        this.selectedCompactItem = this.labelCompact4;
    }
}
