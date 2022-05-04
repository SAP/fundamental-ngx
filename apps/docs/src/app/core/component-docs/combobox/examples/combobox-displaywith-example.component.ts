import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-displaywith-example',
    templateUrl: './combobox-displaywith-example.component.html'
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
