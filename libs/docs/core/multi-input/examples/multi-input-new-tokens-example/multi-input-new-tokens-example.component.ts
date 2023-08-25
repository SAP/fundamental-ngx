import { Component } from '@angular/core';

@Component({
    selector: 'fd-multi-input-new-tokens-example',
    templateUrl: './multi-input-new-tokens-example.component.html'
})
export class MultiInputNewTokensExampleComponent {
    values: Item[] = [
        { name: 'Apple' },
        { name: 'Banana' },
        { name: 'Pineapple' },
        { name: 'Tomato' },
        { name: 'Kiwi' },
        { name: 'Strawberry' },
        { name: 'Blueberry' },
        { name: 'Orange' }
    ];

    selected: Item[] = [];

    displayFunc(obj: Item): string {
        return obj.name;
    }

    parseFunc(value: string): Item {
        return { name: value };
    }

    validateFunc(value: string): boolean {
        return value?.length >= 3;
    }
}

interface Item {
    name: string;
}
