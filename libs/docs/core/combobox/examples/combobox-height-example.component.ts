import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';

@Component({
    selector: 'fd-combobox-height-example',
    templateUrl: './combobox-height-example.component.html',
    standalone: true,
    imports: [ComboboxModule, FormsModule]
})
export class ComboboxHeightExampleComponent {
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
