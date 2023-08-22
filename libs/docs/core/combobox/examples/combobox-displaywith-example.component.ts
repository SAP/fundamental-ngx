import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';

@Component({
    selector: 'fd-combobox-displaywith-example',
    templateUrl: './combobox-displaywith-example.component.html',
    standalone: true,
    imports: [ComboboxModule, FormsModule]
})
export class ComboboxDisplaywithExampleComponent {
    values: Item[] = [
        { name: 'Apple' },
        { name: 'Tomato' },
        { name: 'Banana' },
        { name: 'Grapes' },
        { name: 'Pumpkin' },
        { name: 'Kiwi' },
        { name: 'Mango' },
        { name: 'Cucumber' },
        { name: 'Garlic' },
        { name: 'Pear' }
    ];

    searchTerm: Item | null = null;

    displayFunc(obj: Item | null): string {
        return obj?.name.toLocaleUpperCase() ?? '';
    }
}

interface Item {
    name: string;
}
