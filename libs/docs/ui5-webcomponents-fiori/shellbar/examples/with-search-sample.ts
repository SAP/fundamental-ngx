import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { SuggestionItem } from '@fundamental-ngx/ui5-webcomponents/suggestion-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';

// Import required icons
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/search.js';

@Component({
    selector: 'ui5-doc-shellbar-with-search-sample',
    templateUrl: './with-search-sample.html',
    standalone: true,
    imports: [ShellBar, Avatar, Input, SuggestionItem]
})
export class WithSearchSample {
    primaryTitle = signal('My Application');
    searchValue = signal('');

    suggestions = signal(['Product A', 'Product B', 'Service C', 'Documentation', 'Settings']);

    onSearchInput(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        console.log(`Input value changed: ${event.currentTarget.value}.`);
    }

    onSearchFieldToggle(event: UI5WrapperCustomEvent<ShellBar, 'ui5SearchFieldToggle'>): void {
        console.log('Search field expanded:', event.detail.expanded);
    }

    onSearchButtonClick(): void {
        console.log('Search button clicked');
    }
}
