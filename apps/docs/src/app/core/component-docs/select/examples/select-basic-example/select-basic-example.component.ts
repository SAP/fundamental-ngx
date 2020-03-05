import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-basic-example',
    templateUrl: './select-basic-example.component.html'
})
export class SelectBasicExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue: string;
}
