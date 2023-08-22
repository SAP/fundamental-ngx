import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-combobox-search-field-example',
    templateUrl: './combobox-search-field-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, ComboboxModule, FormsModule]
})
export class ComboboxSearchFieldExampleComponent {
    searchTerm = '';
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
