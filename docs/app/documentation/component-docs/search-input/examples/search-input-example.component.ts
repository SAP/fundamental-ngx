import { Component } from '@angular/core';

@Component({
    selector: 'fd-search-input-example',
    templateUrl: './search-input-example.component.html'
})
export class SearchInputExampleComponent {

    searchTermOne: string = '';
    searchTermTwo: string = '';
    searchTermThree: string = '';

    dropdownValues = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry'
    ];

}
