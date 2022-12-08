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

    options2: { name: string; kCal: string }[] = [
        { name: 'Apple', kCal: '49.05' },
        { name: 'Apple', kCal: '50' },
        { name: 'Kiwi', kCal: '36' },
        { name: 'Tomato', kCal: '24' },
        { name: 'Strawberry', kCal: '32' }
    ];
}
