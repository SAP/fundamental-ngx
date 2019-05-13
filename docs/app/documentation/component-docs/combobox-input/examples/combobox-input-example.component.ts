import { Component } from '@angular/core';

@Component({
  selector: 'fd-combobox-input-example',
  templateUrl: './combobox-input-example.component.html'
})
export class ComboboxInputExampleComponent {

    comboboxInputValOne: string = '';
    comboboxInputValTwo: string = '';
    comboboxInputValThree: string = '';

    dropdownValues = [
        'Apple',
        'Banana',
        'Kiwi',
        'Strawberry'
    ];

    newItem = () => {
        alert('New item callback function called');
    };

}
