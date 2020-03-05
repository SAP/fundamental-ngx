import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-state-example',
    templateUrl: './select-state-example.component.html'
})
export class SelectStateExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue1: string;
    selectedValue2: string;
    selectedValue3: string;
    selectedValue4: string;
    selectedValue5: string = this.options[0];
}
