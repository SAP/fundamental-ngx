import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-table-fixed-example',
    templateUrl: './table-fixed-example.component.html'
})
export class TableFixedExampleComponent implements OnInit {
    tableRows: any[];

    ngOnInit(): void {
        this.tableRows = [
            {
                column1: 'user.name@email.com',
                column2: 'Test',
                column3: 'Row 2',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 2',
                column3: 'Test',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 3',
                column3: 'Row 3',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 4',
                column3: 'Row 4',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 5',
                column3: 'Row 5',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 6',
                column3: 'Row 6',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 7',
                column3: 'Row 7',
                date: '11-12-18',
                type: 'search'
            }
        ];
    }
}
