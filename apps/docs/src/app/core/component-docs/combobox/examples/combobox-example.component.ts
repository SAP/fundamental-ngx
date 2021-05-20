import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-example',
    templateUrl: './combobox-example.component.html',
    styleUrls: ['combobox-example.component.scss']
})
export class ComboboxExampleComponent {
    searchTermOne = '';
    searchTermTwo = '';
    searchTermThree = '';
    searchTermFour = '';
    searchTermFive = 'Kiwi';
    searchTermSix = '';
    fruits = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];
}
