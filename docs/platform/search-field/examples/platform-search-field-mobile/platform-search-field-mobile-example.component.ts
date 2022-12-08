import { Component, ViewEncapsulation } from '@angular/core';
import { SearchInput, SuggestionItem } from '@fundamental-ngx/platform/search-field';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

@Component({
    selector: 'fdp-platform-search-field-mobile-example',
    templateUrl: './platform-search-field-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatformSearchFieldMobileExampleComponent {
    searchTerm = '';
    inputText = '';

    suggestions: SuggestionItem[] = [
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

    mobileConfig: MobileModeConfig = {
        approveButtonText: 'OK',
        hasCloseButton: true
    };

    onSearchSubmit($event: SearchInput): void {
        this.searchTerm = $event.text;
    }

    onInputChange($event: SearchInput): void {
        this.inputText = $event.text;
    }
}
