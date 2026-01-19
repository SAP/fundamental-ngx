import { Component } from '@angular/core';
import { Search } from '@fundamental-ngx/ui5-webcomponents-fiori/search';
import { SearchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/search-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

// Import icon
import '@ui5/webcomponents-icons/dist/customer-and-supplier.js';

@Component({
    selector: 'ui5-doc-search-byline-items-sample',
    templateUrl: './byline-items-sample.html',
    standalone: true,
    imports: [Avatar, Search, SearchItem]
})
export class BylineItemsSample {}
