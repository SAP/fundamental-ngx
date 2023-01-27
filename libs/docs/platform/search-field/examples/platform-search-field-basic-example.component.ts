import { Component, ViewEncapsulation } from '@angular/core';

import { SuggestionItem, SearchInput } from '@fundamental-ngx/platform/search-field';

@Component({
    selector: 'fdp-platform-search-field-basic-example',
    templateUrl: './platform-search-field-basic-example.component.html',
    styleUrls: ['./platform-search-field-basic-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformSearchFieldBasicExampleComponent {
    suggestions: SuggestionItem[] = Array.from({ length: 40 }, (element, index) => ({
        value: `List Item ${index + 1}`
    }));
    searchTerm = '';
    inputText = '';

    compactSearchTerm = '';
    compactInputText = '';

    searchWithoutSuggestionsTerm = '';
    inputWithoutSuggestionsText = '';

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

    onSearchWithoutSuggestionsSubmit($event: SearchInput): void {
        this.searchWithoutSuggestionsTerm = $event.text;
    }

    onInputWithoutSuggestionsChange($event: SearchInput): void {
        this.inputWithoutSuggestionsText = $event.text;
    }
}
