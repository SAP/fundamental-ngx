import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-group-example',
    templateUrl: './combobox-group-example.component.html'
})
export class ComboboxGroupExampleComponent {

    searchTerm = '';

    dropdownValues = [
        {
            name: 'Fruits',
            values: ['Apple', 'Banana', 'Kiwi', 'Strawberry']
        },
        {
            name: 'Vegetables',
            values: ['Carrot', 'Jalapeño', 'Potato', 'Spinach']
        }
    ];

    displayFunc(obj: {name: string, price: string}): string {
        if (obj) {
            return obj.name;
        }
    }

}
