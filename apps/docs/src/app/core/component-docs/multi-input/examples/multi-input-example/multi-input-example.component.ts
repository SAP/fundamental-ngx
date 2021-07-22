import { Component } from '@angular/core';

@Component({
    selector: 'fd-multi-input-example',
    templateUrl: './multi-input-example.component.html'
})
export class MultiInputExampleComponent {
    selected = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry'];
    secondSelected = ['Pineapple'];
    thirdSelected = ['Kiwi'];
    selectedDisabledAutoComplete = ['Kiwi'];
}
