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

    selectItem(event: { item: any; index: number }) {
        this.selected = event.item;
        this.selectedIndex = event.index;
    }

    customFilter(content: any[], searchTerm: string): any[] {
        const search = searchTerm.toLocaleLowerCase();
        return content.filter((item) => item.toLocaleLowerCase().startsWith(search));
    }
}
