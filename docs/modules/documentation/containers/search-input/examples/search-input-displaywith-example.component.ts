import { Component } from '@angular/core';

@Component({
    selector: 'fd-search-input-displaywith-example',
    templateUrl: './search-input-displaywith-example.component.html'
})
export class SearchInputDisplaywithExampleComponent {
    values = [
        {text: 'Apple'},
        {text: 'Banana'},
        {text: 'Pineapple'},
        {text: 'Tomato'}
    ];

    searchTerm = '';

    displayFunc(obj: any): string {
        if (obj) {
            return obj.toLocaleUpperCase();
        }
    }
}
