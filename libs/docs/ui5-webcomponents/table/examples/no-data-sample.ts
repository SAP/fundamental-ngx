import { Component } from '@angular/core';
import { IllustratedMessage } from '@fundamental-ngx/ui5-webcomponents-fiori/illustrated-message';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';

// Import illustration
import '@ui5/webcomponents-fiori/dist/illustrations/NoData.js';

@Component({
    selector: 'ui5-doc-no-data-table-sample',
    templateUrl: './no-data-sample.html',
    standalone: true,
    imports: [Table, TableHeaderRow, TableHeaderCell, IllustratedMessage]
})
export class NoDataTableSample {}
