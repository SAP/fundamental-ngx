import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface ComboboxItem {
    displayedValue: string;
    value: string;
}

@Component({
    selector: 'fd-combobox-forms-example',
    templateUrl: 'combobox-forms-example.component.html',
    styleUrls: ['combobox-forms-example.component.scss']
})
export class ComboboxFormsExampleComponent {
    customForm = new FormGroup({
        item: new FormControl(null),
        itemOnDropdownMode: new FormControl(null)
    });

    dropdownValues: ComboboxItem[] = [
        { displayedValue: 'Apple', value: 'AppleValue' },
        { displayedValue: 'Apple', value: 'AppleValue2' },
        { displayedValue: 'Banana', value: 'BananaValue' },
        { displayedValue: 'Kiwi', value: 'KiwiValue' },
        { displayedValue: 'Strawberry', value: 'StrawberryValue' },
        { displayedValue: 'Tomato', value: 'TomatoValue' }
    ];

    myDisplayFunction = (item: ComboboxItem): string => item?.displayedValue ?? '';
}
