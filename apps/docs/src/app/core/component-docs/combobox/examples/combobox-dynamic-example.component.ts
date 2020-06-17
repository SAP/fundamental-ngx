import { Component } from '@angular/core';

@Component({
    selector: 'fd-combobox-dynamic-example',
    templateUrl: './combobox-dynamic-example.component.html'
})
export class ComboboxDynamicExampleComponent {
    selected: string;
    selectedIndex: number;

    dropdownValues = ['Apple', 'Banana', 'Kiwi', 'Strawberry', 'Tomato', 'Pineapple'];

    selectItem(event: string) {
        const index: number = this.dropdownValues.findIndex(item => item === event);

        if (index > -1) {
            this.selectedIndex = index;
            this.selected = this.dropdownValues[index]
        }
    }

    customFilter(content: any[], searchTerm: string): any[] {
        const search = searchTerm.toLocaleLowerCase();
        return content.filter((item) => item.toLocaleLowerCase().startsWith(search));
    }
}
