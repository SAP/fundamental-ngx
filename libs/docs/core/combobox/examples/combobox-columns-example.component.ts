import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { ListModule, ListSecondaryDirective } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-combobox-columns-example',
    templateUrl: './combobox-columns-example.component.html',
    imports: [ComboboxComponent, FormsModule, ListModule, NgClass, ListSecondaryDirective]
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
