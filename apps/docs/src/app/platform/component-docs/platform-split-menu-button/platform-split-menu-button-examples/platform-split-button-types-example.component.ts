import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-split-button-types-example',
    templateUrl: 'platform-split-button-types-example.component.html'
})
export class PlatformDocsSplitMenuButtonTypesComponent {
    selectedCozyItem: string;

    labelStandardCozy = 'Standard Button';
    labelPositiveCozy = 'Positive Button';
    labelNegativeCozy = 'Negative Button';
    labelGhostCozy = 'Ghost Button';
    labelTransparentCozy = 'Transparent Button';
    labelEmphasizedCozy = 'Emphasized Button';

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
}
