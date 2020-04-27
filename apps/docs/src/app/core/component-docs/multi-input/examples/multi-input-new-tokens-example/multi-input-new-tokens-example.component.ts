import { Component } from '@angular/core';

@Component({
    selector: 'fd-multi-input-new-tokens-example',
    templateUrl: './multi-input-new-tokens-example.component.html'
})
export class MultiInputNewTokensExampleComponent {
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
        return obj.name;
    }

    parseFunc(value: string): object {
        if (value && value.length) {
            return { name: value };
        }
    }
}
