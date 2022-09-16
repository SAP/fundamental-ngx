import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-mode-example',
    templateUrl: './select-mode-example.component.html'
})
export class SelectModeExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue1: string;
    selectedValue2: string;
    selectedValue3: string;
    selectedValue4 = this.options[2];
    selectedValue5 = this.options[0];
}
