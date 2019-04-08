import { Component } from '@angular/core';

@Component({
    selector: 'fd-search-input-dynamic-example',
    templateUrl: './search-input-dynamic-example.component.html'
})
export class SearchInputDynamicExampleComponent {

    searchTerm: string = '';

    selected: string;

    dropdownValues = [
        { text: 'Apple', callback: () => {alert('Apple Clicked!')} },
        { text: 'Banana', callback: () => {alert('Banana Clicked!')} },
        { text: 'Kiwi', callback: () => {alert('Kiwi Clicked!')} },
        { text: 'Strawberry', callback: () => {alert('Strawberry Clicked!')} },
        { text: 'Tomato', callback: () => {alert('Tomato Clicked!')} },
        { text: 'Pineapple', callback: () => {alert('Pineapple Clicked!')} }
    ];

    selectItem(event: any) {
        this.selected = event.text;
    }

    customFilter(content: any[], searchTerm: string): any[] {
        const search = searchTerm.toLocaleLowerCase();
        return content.filter(item =>
            item.text.toLocaleLowerCase().startsWith(search)
        );
    }
}
