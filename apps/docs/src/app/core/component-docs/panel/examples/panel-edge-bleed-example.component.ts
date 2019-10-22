import { Component } from '@angular/core';


@Component({
    selector: 'fd-panel-edge-bleed-example',
    templateUrl: './panel-edge-bleed-example.component.html'
})
export class PanelEdgeBleedExampleComponent {

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
