import { Component } from '@angular/core';

@Component({
    selector: 'fd-form-message-example',
    templateUrl: './form-message-example.component.html',
    styles: [
        `
            .fd-custom-form-item-message {
                margin-bottom: 40px !important;
            }
        `
    ]
})
export class FormMessageExampleComponent {
    open = false;

    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    selected: string[] = ['Apple', 'Banana'];
}
