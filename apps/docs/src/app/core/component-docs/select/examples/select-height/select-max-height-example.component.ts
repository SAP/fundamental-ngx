import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-max-height-example',
    templateUrl: './select-max-height-example.component.html'
})
export class SelectMaxHeightExampleComponent {
    selectedValue: string;
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry', 'Banana', 'Orange', 'Lemon', 'Carrot', 'Kiwi', 'Grapes'];
}
