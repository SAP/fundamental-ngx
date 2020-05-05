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
    selectedValue4: string;
    selectedValue5: string = this.options[0];
}
