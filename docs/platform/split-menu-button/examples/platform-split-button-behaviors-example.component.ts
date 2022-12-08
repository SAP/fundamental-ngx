import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-split-button-behaviors-example',
    templateUrl: 'platform-split-button-behaviors-example.component.html'
})
export class PlatformDocsSplitMenuButtonBehaviorComponent {
    label1 = 'Option 1';
    label2 = 'Option 1';
    label3 = 'Option 1';

    selectedItem1: string;
    selectedItem2: string;
    selectedItem3: string;

    public onItemSelect1(menuItemValue: string): void {
        this.selectedItem1 = menuItemValue;
        this.label1 = menuItemValue;
    }

    public onPrimaryButtonClick1(): void {
        this.selectedItem1 = this.label1;
        alert('primary button clicked');
    }

    public onItemSelect2(menuItemValue: string): void {
        this.selectedItem2 = menuItemValue;
        this.label2 = menuItemValue;
    }

    public onPrimaryButtonClick2(): void {
        this.selectedItem1 = this.label2;
        alert('primary button clicked');
    }

    public onItemSelect3(menuItemValue: string): void {
        this.selectedItem3 = menuItemValue;
        this.label3 = menuItemValue;
    }

    public onPrimaryButtonClick3(): void {
        this.selectedItem3 = this.label3;
        alert('primary button clicked');
    }
}
