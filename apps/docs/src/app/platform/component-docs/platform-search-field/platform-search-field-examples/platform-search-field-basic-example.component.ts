import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SuggestionItem, SearchInput } from '@fundamental-ngx/platform/search-field';

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

    ngOnInit(): void {
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

    onSearchSubmit($event: SearchInput): void {
        this.searchTerm = $event.text;
    }

    onInputChange($event: SearchInput): void {
        this.inputText = $event.text;
    }

    onCompactSearchSubmit($event: SearchInput): void {
        this.compactSearchTerm = $event.text;
    }

    onCompactInputChange($event: SearchInput): void {
        this.compactInputText = $event.text;
    }
}
