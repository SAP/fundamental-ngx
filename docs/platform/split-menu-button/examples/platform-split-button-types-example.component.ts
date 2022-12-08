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
        alert('standard primary button clicked');
    }

    public onItemSelectCozyPositive(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelPositiveCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyPositive(): void {
        this.selectedCozyItem = this.labelPositiveCozy;
        alert('Positive primary button clicked');
    }

    public onItemSelectCozyNegative(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelNegativeCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyNegative(): void {
        this.selectedCozyItem = this.labelNegativeCozy;
        alert('Negative primary button clicked');
    }

    public onItemSelectCozyGhost(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelGhostCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyGhost(): void {
        this.selectedCozyItem = this.labelGhostCozy;
        alert('Ghost primary button clicked');
    }

    public onItemSelectCozyTransparent(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelTransparentCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyTransparent(): void {
        this.selectedCozyItem = this.labelTransparentCozy;
        alert('Transparent primary button clicked');
    }

    public onItemSelectCozyEmphasized(menuItemValue: string): void {
        this.selectedCozyItem = menuItemValue;
        this.labelEmphasizedCozy = menuItemValue;
    }

    public onPrimaryButtonClickCozyEmphasized(): void {
        this.selectedCozyItem = this.labelEmphasizedCozy;
        alert('Emphasized primary button clicked');
    }
}
