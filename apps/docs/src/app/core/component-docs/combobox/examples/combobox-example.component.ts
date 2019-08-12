import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-example',
    templateUrl: './combobox-example.component.html'
})
export class ComboboxExampleComponent {

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
