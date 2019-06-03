import { Component } from '@angular/core';

@Component({
    selector: 'fd-search-input-displaywith-example',
    templateUrl: './search-input-displaywith-example.component.html'
})
export class SearchInputDisplaywithExampleComponent {
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
        { name: 'Pear' },
    ];

    searchTerm = '';

    displayFunc(obj: {name: string}): string {
        if (obj) {
            return obj.name.toLocaleUpperCase();
        }
    }
}
