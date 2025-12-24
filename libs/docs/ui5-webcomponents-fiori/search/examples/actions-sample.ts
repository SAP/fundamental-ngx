import { Component } from '@angular/core';
import { Search } from '@fundamental-ngx/ui5-webcomponents-fiori/search';
import { SearchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/search-item';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

// Import icon
import '@ui5/webcomponents-icons/dist/globe.js';
import '@ui5/webcomponents-icons/dist/share.js';

@Component({
    selector: 'ui5-doc-search-actions-sample',
    templateUrl: './actions-sample.html',
    standalone: true,
    imports: [Search, SearchItem, Button]
})
export class ActionsSample {}
