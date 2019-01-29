import { Component } from '@angular/core';

@Component({
    selector: 'fd-search-input-dynamic-example',
    templateUrl: './search-input-dynamic-example.component.html'
})
export class SearchInputDynamicExampleComponent {

    searchTerm: string = '';

    selected: string;

    dropdownValues = [
        { text: 'Apple' },
        { text: 'Banana' },
        { text: 'Kiwi' },
        { text: 'Strawberry' },
        { text: 'Tomato' },
        { text: 'Pineapple' }
    ];

    dropdownSubject = this.dropdownValues;

    modelChange(event: any): void {
        this.searchTerm = event;
        this.dropdownSubject = this.dropdownValues.filter(value =>
                value.text.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()));
    }

    selectItem(event: any) {
        this.selected = event.text;
    }
}
