import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchInput, SuggestionItem } from '@fundamental-ngx/platform';
import { MobileModeConfig } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-platform-search-field-mobile-example',
    templateUrl: './platform-search-field-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatformSearchFieldMobileExampleComponent implements OnInit {
    searchTerm = '';
    inputText = '';

    suggestions: SuggestionItem[];

    mobileConfig: MobileModeConfig = {
        approveButtonText: 'OK',
        hasCloseButton: true,
    };

    isLoading = true;

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
}
