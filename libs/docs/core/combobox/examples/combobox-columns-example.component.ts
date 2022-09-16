import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-columns-example',
    templateUrl: './combobox-columns-example.component.html'
})
export class ComboboxColumnsExampleComponent {
    searchTerm = '';

    dropdownValues = [
        { name: 'Apple', price: '1.00 USD' },
        { name: 'Banana', price: '0.50 USD' },
        { name: 'Kiwi', price: '1.00 USD' },
        { name: 'Pineapple', price: '3.00 USD' },
        { name: 'Strawberries', price: '4.00 USD' }
    ];

    displayFunc(obj: { name: string; price: string }): string {
        if (obj) {
            return obj.name + ' - ' + obj.price;
        }
        return '';
    }
}
