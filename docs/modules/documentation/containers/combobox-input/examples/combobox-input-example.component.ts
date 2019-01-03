import { Component } from '@angular/core';

@Component({
  selector: 'fd-combobox-input-example',
  templateUrl: './combobox-input-example.component.html'
})
export class ComboboxInputExampleComponent {

    comboboxInputVal: string = '';

    dropdownValues = [
        {text: 'Apple', callback: () => {alert('Apple Clicked')}},
        {text: 'Banana', callback: () => {alert('Banana Clicked')}},
        {text: 'Kiwi', callback: () => {alert('Kiwi Clicked')}},
        {text: 'Strawberry', callback: () => {alert('Strawberry Clicked')}}
    ];

    exampleSearchFunction = () => {
        alert('Search Function Called with search term: ' + this.comboboxInputVal);
    };

    newItemCallback = () => {
        alert('New item callback function called');
    };

}
