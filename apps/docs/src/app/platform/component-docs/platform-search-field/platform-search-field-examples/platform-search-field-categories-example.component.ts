import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SuggestionItem, SearchInput, ValueLabelItem } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-search-field-categories-example',
    templateUrl: './platform-search-field-categories-example.component.html',
    styleUrls: ['./platform-search-field-categories-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformSearchFieldCategoriesExampleComponent implements OnInit {

    public suggestions: SuggestionItem[];
    public categories: ValueLabelItem[];

    public searchTerm = '';
    public searchCategory = '';
    public inputText = '';
    public inputCategory = '';

    public compactSearchTerm = '';
    public compactSearchCategory = '';
    public compactInputText = '';
    public compactInputCategory = '';

    ngOnInit() {
        this.suggestions = [{
            value: 'Apple'
        }, {
            value: 'Banana'
        }, {
            value: 'Blueberry'
        }, {
            value: 'Cherry'
        }, {
            value: 'Grape'
        }, {
            value: 'Lemon'
        }, {
            value: 'Lime'
        }, {
            value: 'Orange'
        }, {
            value: 'Peach'
        }, {
            value: 'Pineapple'
        }, {
            value: 'Plum'
        }, {
            value: 'Raspberry'
        }];

        this.categories = [{
            value: 'red',
            label: 'Red'
        }, {
            value: 'orange',
            label: 'Orange'
        }, {
            value: 'yellow',
            label: 'Yellow'
        }, {
            value: 'green',
            label: 'Green'
        }, {
            value: 'blue',
            label: 'Blue'
        }, {
            value: 'indigo',
            label: 'Indigo'
        }, {
            value: 'violet',
            label: 'Violet'
        }];
    }

    onSearchSubmit($event: SearchInput) {
        this.searchTerm = $event.text;
        this.searchCategory = $event.category;
    }

    onInputChange($event: SearchInput) {
        this.inputText = $event.text;
        this.inputCategory = $event.category;
    }

    onCompactSearchSubmit($event: SearchInput) {
        this.compactSearchTerm = $event.text;
        this.compactSearchCategory = $event.category;
    }

    onCompactInputChange($event: SearchInput) {
        this.compactInputText = $event.text;
        this.compactInputCategory = $event.category;
    }
}
