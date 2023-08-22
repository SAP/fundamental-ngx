import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TableModule } from '@fundamental-ngx/core/table';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';

@Component({
    selector: 'fd-layout-panel-edge-bleed-example',
    templateUrl: './layout-panel-edge-bleed-example.component.html',
    standalone: true,
    imports: [LayoutPanelModule, FocusableGridDirective, TableModule, NgFor]
})
export class LayoutPanelEdgeBleedExampleComponent {
    tableHeaders = ['Column Header 1', 'Column Header 2', 'Column Header 3', 'Column Header 4'];
    tableData = [
        {
            rowData: ['Data 1', 'Data 2', 'Data 3', 'Data 4']
        },
        {
            rowData: ['Data 5', 'Data 6', 'Data 7', 'Data 8']
        }
    ];
}
