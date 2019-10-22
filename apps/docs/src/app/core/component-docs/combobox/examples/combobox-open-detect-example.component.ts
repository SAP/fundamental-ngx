import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-open-detect-example',
    templateUrl: './combobox-open-detect-example.component.html',
})
export class ComboboxOpenDetectExampleComponent {

    dropdownValues = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry'
    ];

    handleIsOpenChange(isOpen: boolean): void {
        if (isOpen) {
            alert('Combobox Opened');
        } else {
            alert('Combobox Closed');
        }
    }
}
