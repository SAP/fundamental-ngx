import { Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-layout-panel-edge-bleed-example',
    templateUrl: './layout-panel-edge-bleed-example.component.html',
    imports: [LayoutPanelModule, FocusableGridDirective, TableModule]
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
