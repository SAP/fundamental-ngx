import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-example',
    templateUrl: './combobox-example.component.html'
})
export class ComboboxExampleComponent {
    searchTermOne = '';
    searchTermTwo = '';
    searchTermThree = '';
    searchTermFour = '';
    searchTermFive = '';
    searchTermSix = '';

    dropdownValues = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];
}
