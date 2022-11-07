import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-example',
    templateUrl: './select-example.component.html'
})
export class SelectExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Kiwi', 'Tomato', 'Strawberry'];

    options2: { name: string; kCal: string }[] = [
        { name: 'Apple', kCal: '49.05' },
        { name: 'Pineapple', kCal: '50' },
        { name: 'Kiwi', kCal: '36' },
        { name: 'Tomato', kCal: '24' },
        { name: 'Strawberry', kCal: '32' }
    ];
}
