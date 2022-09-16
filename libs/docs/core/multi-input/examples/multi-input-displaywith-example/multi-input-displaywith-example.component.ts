import { Component } from '@angular/core';

@Component({
    selector: 'fd-multi-input-displaywith-example',
    templateUrl: './multi-input-displaywith-example.component.html'
})
export class MultiInputDisplaywithExampleComponent {
    values = [
        { name: 'Apple' },
        { name: 'Banana' },
        { name: 'Pineapple' },
        { name: 'Tomato' },
        { name: 'Kiwi' },
        { name: 'Strawberry' },
        { name: 'Blueberry' },
        { name: 'Orange' }
    ];

    selected = [];

    displayFunc(obj: any): string {
        return obj.name.toLocaleUpperCase();
    }
}
