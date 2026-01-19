import { Component, signal } from '@angular/core';
import { Search } from '@fundamental-ngx/ui5-webcomponents-fiori/search';
import { SearchMessageArea } from '@fundamental-ngx/ui5-webcomponents-fiori/search-message-area';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Toast } from '@fundamental-ngx/ui5-webcomponents/toast';

// Import icon
import '@ui5/webcomponents-icons/dist/filter.js';

@Component({
    selector: 'ui5-doc-search-advanced-filtering-sample',
    templateUrl: './advanced-filtering-sample.html',
    standalone: true,
    imports: [Button, Search, Toast, SearchMessageArea]
})
export class AdvancedFilteringSample {
    showToast = signal(false);

    onFilterButtonClick(): void {
        this.showToast.set(true);
    }
}
