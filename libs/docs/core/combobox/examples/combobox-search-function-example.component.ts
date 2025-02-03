import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';

@Component({
    selector: 'fd-combobox-search-function-example',
    templateUrl: 'combobox-search-function-example.component.html',
    imports: [ComboboxComponent, FormsModule]
})
export class ComboboxSearchFunctionExampleComponent {
    searchTerm = '';

    dropdownValues = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry',
        'Raspberries',
        'Watermelons',
        'Nectarines',
        'Oranges'
    ];

    customSearchFunction = (): void => {
        alert('Custom Function Called');
    };
}
