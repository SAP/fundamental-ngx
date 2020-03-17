import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-group-example',
    templateUrl: './combobox-group-example.component.html'
})
export class ComboboxGroupExampleComponent {

    searchTerm = '';

    dropdownValues = [
        {name: 'Apple', type: 'Fruits'},
        {name: 'Banana', type: 'Fruits'},
        {name: 'Pineapple', type: 'Fruits'},
        {name: 'Strawberry', type: 'Fruits'},
        {name: 'Broccoli', type: 'Vegetables'},
        {name: 'Carrot', type: 'Vegetables'},
        {name: 'Jalapeño', type: 'Vegetables'},
        {name: 'Spinach', type: 'Vegetables'}
    ];

    displayFunc(obj: {name: string, price: string}): string {
        if (obj) {
            return obj.name;
        }
    }

}
