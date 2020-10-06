import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-split-button-icons-example',
    templateUrl: 'platform-split-button-icons-example.component.html'
})
export class PlatformDocsSplitMenuButtonIconsComponent {
    label1 = 'Option 1';
    label2 = 'Option 1';
    label3 = '';

    title3 = 'Split button with icon';
    selectedItem1: string;
    selectedItem2: string;
    selectedItem3: string;

    public onItemSelect1(menuItemValue: string): void {
        this.selectedItem1 = menuItemValue;
        this.label1 = menuItemValue;
    }

    public onPrimaryButtonClick1(): void {
        this.selectedItem1 = this.label1;
    }

    public onItemSelect2(menuItemValue: string): void {
        this.selectedItem2 = menuItemValue;
        this.label2 = menuItemValue;
    }

    public onPrimaryButtonClick2(): void {
        this.selectedItem2 = this.label2;
    }

    public onItemSelect3(menuItemValue: string): void {
        this.selectedItem3 = menuItemValue;
        this.label3 = menuItemValue;
        this.title3 = menuItemValue ? menuItemValue : this.title3;
    }

    public onPrimaryButtonClick3(): void {
        this.selectedItem3 = this.label3;
    }
}
