import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-table-pagination-example',
    templateUrl: './table-pagination-example.component.html'
})
export class TablePaginationExampleComponent implements OnInit {
    tableRows;
    displayedRows;
    totalItems = 25;
    itemsPerPage = 5;
    currentPage = 3;
    itemsPerPageOptions = [3, 5, 10];

    newPageClicked(event) {
        this.currentPage = event;
        const firstDisplayedRow = (event - 1) * this.itemsPerPage;
        this.displayedRows = this.tableRows.slice(firstDisplayedRow, firstDisplayedRow + this.itemsPerPage);
    }

    itemsPerPageChange(value) {
        this.itemsPerPage = value;
        this.newPageClicked(1);
    }

    ngOnInit() {
        this.tableRows = [
            {
                column1: 'Row 1',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 2',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 3',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 4',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 5',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 6',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 7',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 8',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 9',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 10',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 11',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 12',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 13',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 14',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 15',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 16',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 17',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 18',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 19',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 20',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 21',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 21',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 23',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 24',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 25',
                date: '11-12-18',
                type: 'search'
            }
        ];

        this.newPageClicked(3);
    }
}
