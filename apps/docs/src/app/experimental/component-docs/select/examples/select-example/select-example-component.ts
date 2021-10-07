import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-example',
    templateUrl: './select-example.component.html'
})
export class SelectExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Kiwi', 'Tomato', 'Strawberry'];
}
