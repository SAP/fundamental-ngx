import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-table-column-sorting-example',
    templateUrl: './table-column-sorting-example.component.html'
})
export class TableColumnSortingExampleComponent implements OnInit {
    tableRows;
    column1SortDir: string = 'none';
    dateSortDir: string = 'none';

    @ViewChild('column1SortPopover')
    column1SortPopover: PopoverComponent;

    sortColumn1(dir: string) {
        this.dateSortDir = 'none';
        this.column1SortPopover.close();
        if (dir === 'asc') {
            this.tableRows.sort((val1, val2) => {
                if (val1.column1 < val2.column1) {
                    return -1;
                } else if (val1.column1 > val2.column1) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (dir === 'desc') {
            this.tableRows.sort((val1, val2) => {
                if (val1.column1 > val2.column1) {
                    return -1;
                } else if (val1.column1 < val2.column1) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    }

    sortDate() {
        this.column1SortDir = 'none';
        if (this.dateSortDir === 'asc') {
            this.dateSortDir = 'dsc';
            this.tableRows.sort((val1, val2) => {
                return +new Date(val1.date) - +new Date(val2.date);
            });
        } else if (this.dateSortDir === 'none' || this.dateSortDir === 'dsc') {
            this.dateSortDir = 'asc';
            this.tableRows.sort((val1, val2) => {
                return +new Date(val2.date) - +new Date(val1.date);
            });
        }
    }

    ngOnInit() {
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
