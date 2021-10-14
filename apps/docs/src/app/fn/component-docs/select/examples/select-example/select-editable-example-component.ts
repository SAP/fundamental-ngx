import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-editable-example',
    templateUrl: './select-editable-example.component.html'
})
export class SelectEditableExampleComponent {
    options: string[] = [
        'Apple',
        'Apricot',
        'Papaya',
        'Pineapple',
        'Kiwi',
        'Kumquat',
        'Tangerine',
        'Tomato',
        'Strawberry'
    ];
}
