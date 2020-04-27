import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface ComboboxItem {
    displayedValue: string;
    value: string;
}

@Component({
    selector: 'fd-combobox-forms-example',
    templateUrl: 'combobox-forms-example.component.html'
})
export class ComboboxFormsExampleComponent {
    customForm = new FormGroup({
        item: new FormControl(null),
        itemOnDropdownMode: new FormControl(null)
    });

    dropdownValues: ComboboxItem[] = [
        { displayedValue: 'Apple', value: 'AppleValue' },
        { displayedValue: 'Banana', value: 'BananaValue' },
        { displayedValue: 'Kiwi', value: 'AppleValue' },
        { displayedValue: 'Strawberry', value: 'AppleValue' },
        { displayedValue: 'Tomato', value: 'AppleValue' }
    ];

    myDisplayFunction = (item: ComboboxItem): string => {
        if (item) {
            return item.displayedValue;
        }
    };
}
