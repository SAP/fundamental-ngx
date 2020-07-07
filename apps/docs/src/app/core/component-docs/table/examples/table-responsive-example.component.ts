import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-table-responsive-example',
    templateUrl: './table-responsive-example.component.html',
    styleUrls: ['table-responsive-example.component.scss']
})
export class TableResponsiveExampleComponent implements OnInit {
    tableRows: any[];

    ngOnInit(): void {
        this.tableRows = [
            {
                column1: 'Row 1',
                column2: 'Row 1',
                column3: 'Row 1',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 2',
                column2: 'Row 2',
                column3: 'Row 2',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 3',
                column2: 'Row 3',
                column3: 'Row 3',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 4',
                column2: 'Row 4',
                column3: 'Row 4',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 5',
                column2: 'Row 5',
                column3: 'Row 5',
                date: '11-12-18',
                type: 'search'
            }
        ];
    }
}
