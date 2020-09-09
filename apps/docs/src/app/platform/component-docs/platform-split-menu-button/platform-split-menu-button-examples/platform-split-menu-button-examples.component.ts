import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-split-menu-button-examples',
    templateUrl: 'platform-split-menu-button-examples.component.html'
})
export class PlatformDocsSplitMenuButtonExampleComponent {
    selectedCozyItem: string;
    selectedCompactItem: string;
    selectedItem: string;

    label = 'Standard Button';
    labelStandardCozy = 'Standard Button';
    labelPositiveCozy = 'Positive Button';
    labelNegativeCozy = 'Negative Button';
    labelGhostCozy = 'Ghost Button';
    labelTransparentCozy = 'Transparent Button';
    labelEmphasizedCozy = 'Emphasized Button';

    labelStandardCompact = 'Standard Button';
    labelPositiveCompact = 'Positive Button';
    labelNegativeCompact = 'Negative Button';
    labelGhostCompact = 'Ghost Button';
    labelTransparentCompact = 'Transparent Button';
    labelEmphasizedCompact = 'Emphasized Button';

    public onItemSelectCozyStandard(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelStandardCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyStandard(): void {
        this.selectedCozyItem = this.labelStandardCozy;
    }

    public onItemSelectCozyPositive(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelPositiveCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyPositive(): void {
        this.selectedCozyItem = this.labelPositiveCozy;
    }

    public onItemSelectCozyNegative(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelNegativeCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyNegative(): void {
        this.selectedCozyItem = this.labelNegativeCozy;
    }

    public onItemSelectCozyGhost(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelGhostCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyGhost(): void {
        this.selectedCozyItem = this.labelGhostCozy;
    }

    public onItemSelectCozyTransparent(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelTransparentCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyTransparent(): void {
        this.selectedCozyItem = this.labelTransparentCozy;
    }

    public onItemSelectCozyEmphasized(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelEmphasizedCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyEmphasized(): void {
        this.selectedCozyItem = this.labelEmphasizedCozy;
    }

    public onItemSelectCompactStandard(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelStandardCompact = menuItemValue;
    }

    public onPrimaryButtonClickCompactStandard(): void {
        this.selectedCompactItem = this.labelStandardCompact;
    }

    public onItemSelectCompactPositive(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelPositiveCompact = menuItemValue;
    }

    public onPrimaryButtonClickCompactPositive(): void {
        this.selectedCompactItem = this.labelPositiveCompact;
    }

    public onItemSelectCompactNegative(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelNegativeCompact = menuItemValue;
    }

    public onPrimaryButtonClickCompactNegative(): void {
        this.selectedCompactItem = this.labelNegativeCompact;
    }

    public onItemSelectCompactGhost(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelGhostCompact = menuItemValue;
    }

    public onPrimaryButtonClickCompactGhost(): void {
        this.selectedCompactItem = this.labelGhostCompact;
    }

    public onItemSelectCompactTransparent(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelTransparentCompact = menuItemValue;
    }

    public onPrimaryButtonClickCompactTransparent(): void {
        this.selectedCompactItem = this.labelTransparentCompact;
    }

    public onItemSelectCompactEmphasized(menuItemValue: string): void {
        this.selectedCompactItem = menuItemValue;
        this.labelEmphasizedCompact = menuItemValue;
    }

    public onPrimaryButtonClickCompactEmphasized(): void {
        this.selectedCompactItem = this.labelEmphasizedCompact;
    }

    public onItemSelectIntz(menuItemValue: string): void {
        this.selectedItem = menuItemValue;
        this.label = menuItemValue;
    }

    public onPrimaryButtonClickIntz(): void {
        this.selectedItem = this.label;
    }
}
