import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SuggestionItem, SearchInput } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-search-field-basic-example',
    templateUrl: './platform-search-field-basic-example.component.html',
    styleUrls: ['./platform-search-field-basic-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformSearchFieldBasicExampleComponent implements OnInit {
    public suggestions: SuggestionItem[];

    public searchTerm = '';
    public inputText = '';

    public compactSearchTerm = '';
    public compactInputText = '';

    ngOnInit() {
        this.suggestions = [
            {
                value: 'Apple'
            },
            {
                value: 'Banana'
            },
            {
                value: 'Blueberry'
            },
            {
                value: 'Cherry'
            },
            {
                value: 'Grape'
            },
            {
                value: 'Lemon'
            },
            {
                value: 'Lime'
            },
            {
                value: 'Orange'
            },
            {
                value: 'Peach'
            },
            {
                value: 'Pineapple'
            },
            {
                value: 'Plum'
            },
            {
                value: 'Raspberry'
            }
        ];
    }

    onSearchSubmit($event: SearchInput) {
        this.searchTerm = $event.text;
    }

    onInputChange($event: SearchInput) {
        this.inputText = $event.text;
    }

    onCompactSearchSubmit($event: SearchInput) {
        this.compactSearchTerm = $event.text;
    }

    onCompactInputChange($event: SearchInput) {
        this.compactInputText = $event.text;
    }
}
