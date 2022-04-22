import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-displaywith-example',
    templateUrl: './combobox-displaywith-example.component.html'
})
export class ComboboxDisplaywithExampleComponent {
    values = [
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

    searchTerm = '';

    displayFunc(obj: { name: string }): string {
        return obj?.name.toLocaleUpperCase() ?? '';
    }
}
