import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-dynamic-example',
    templateUrl: './combobox-dynamic-example.component.html'
})
export class ComboboxDynamicExampleComponent {
    selectedIndex: number;

    dropdownValues = ['Apple', 'Banana', 'Kiwi', 'Strawberry', 'Tomato', 'Pineapple'];

    customFilter(content: any[], searchTerm: string): any[] {
        if (!searchTerm) {
            return content;
        }
        return content.filter((item) => item.startsWith(searchTerm));
    }
}
