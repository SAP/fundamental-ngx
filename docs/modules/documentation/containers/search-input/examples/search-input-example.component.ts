import { Component } from '@angular/core';

@Component({
    selector: 'fd-search-input-example',
    templateUrl: './search-input-example.component.html'
})
export class SearchInputExampleComponent {

    searchTerm = '';

    searchTerms = [
        {text: 'Apple', callback: () => {alert('Apple Clicked')}},
        {text: 'Banana', callback: () => {alert('Banana Clicked')}},
        {text: 'Kiwi', callback: () => {alert('Kiwi Clicked')}},
        {text: 'Strawberry', callback: () => {alert('Strawberry Clicked')}}
    ];

    searchFunction() {
        alert('Search Function Called');
    }

}
