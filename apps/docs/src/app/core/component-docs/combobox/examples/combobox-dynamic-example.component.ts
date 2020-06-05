import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-dynamic-example',
    templateUrl: './combobox-dynamic-example.component.html'
})
export class ComboboxDynamicExampleComponent {
    searchTerm: string = '';

    selected: string;
    selectedIndex: number;

    dropdownValues = ['Apple', 'Banana', 'Kiwi', 'Strawberry', 'Tomato', 'Pineapple'];

    selectItem(event: string) {
        this.dropdownValues.forEach((value, i) => {
            if (value === event) {
                this.selected = value;
                this.selectedIndex = i;
            }
        });
    }

    customFilter(content: any[], searchTerm: string): any[] {
        const search = searchTerm.toLocaleLowerCase();
        return content.filter((item) => item.toLocaleLowerCase().startsWith(search));
    }
}
