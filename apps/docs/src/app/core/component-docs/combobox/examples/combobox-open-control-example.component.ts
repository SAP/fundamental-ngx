import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-open-control-example',
    templateUrl: './combobox-open-control-example.component.html'
})
export class ComboboxOpenControlExampleComponent {
    dropdownValues = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];

    open: boolean = false;

    handleIsOpenChange(isOpen: boolean): void {
        if (isOpen) {
            alert('Combobox Opened');
        } else {
            alert('Combobox Closed');
        }
    }
}
