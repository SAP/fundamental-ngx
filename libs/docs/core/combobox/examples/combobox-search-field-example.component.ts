import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-combobox-search-field-example',
    templateUrl: './combobox-search-field-example.component.html',
    imports: [FormItemComponent, FormLabelComponent, ComboboxComponent, FormsModule]
})
export class ComboboxSearchFieldExampleComponent {
    searchTerm = '';
    searchTerm2 = '';
    searchTerm3 = '';
    searchTerm4 = '';
    fruits = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry',
        'Blueberry',
        'Orange',
        'Lemon',
        'Raspberry',
        'Grapefruit',
        'Apricot',
        'Avocado',
        'Cherry'
    ];
}
