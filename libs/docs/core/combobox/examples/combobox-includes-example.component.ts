import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';

@Component({
    selector: 'fd-combobox-includes-example',
    templateUrl: './combobox-includes-example.component.html',
    imports: [ComboboxComponent, FormsModule]
})
export class ComboboxIncludesExampleComponent {
    searchTermOne = '';

    dropdownValues = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry',
        'Raspberries',
        'Watermelons',
        'Nectarines',
        'Oranges',
        'Pear',
        'Grape',
        'Cherry',
        'Blueberry',
        'Avocado',
        'Fig',
        'Pomegranate'
    ];
}
