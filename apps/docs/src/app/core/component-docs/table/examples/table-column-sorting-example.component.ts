import { Component, OnInit } from '@angular/core';

interface ExampleRow {
    column1: any,
    column2?: any,
    column3?: any,
    date?: any,
    type?: any
}

type columnSortType = (a: ExampleRow, b: ExampleRow) => boolean;
const sort = (a, b, firstComparer: columnSortType, secondComparer: columnSortType) => {
    if (firstComparer(a.column1, b.column1)) {
        return -1;
    } else if (secondComparer(a.column1, b.column1)) {
        return 1;
    } else {
        return 0;
    }
};

const asc: columnSortType = (a, b) => a < b;
const desc: columnSortType = (a, b) => a > b;

const sortMethod = {
    asc: (a, b) => sort(a, b, asc, desc),
    desc: (a, b) => sort(a, b, desc, asc)
};

@Component({
    selector: 'fd-table-column-sorting-example',
    templateUrl: './table-column-sorting-example.component.html'
})
export class TableColumnSortingExampleComponent implements OnInit {
    tableRows;
    displayedRows;
    column1SortDir: string = 'asc';
    filterVal: string = '';
    open: boolean = false;

    sortColumn1(dir: string) {
        if (dir) {
            this.column1SortDir = dir;
            this.tableRows.sort(sortMethod[dir]);
        }

        this.displayedRows = this.tableRows;
        if (this.filterVal) {
            this.filterChange(this.filterVal);
        }
        this.open = false;
    }

    filterChange(searchTerm: string) {
        const searchLower = searchTerm.toLocaleLowerCase();
        this.displayedRows = this.tableRows.filter((item) => {
            if (item) {
                return item.column1.toLocaleLowerCase().includes(searchLower);
            }
        });
    }

    inputKeyup(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === 'Esc') {
            this.open = false;
        }
    }

    ngOnInit() {
        this.tableRows = [
            {
                column1: 'Apple',
                column2: 'Row 1',
                column3: 'Row 1',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Banana',
                column2: 'Row 2',
                column3: 'Row 2',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Kiwi',
                column2: 'Row 3',
                column3: 'Row 3',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Peach',
                column2: 'Row 4',
                column3: 'Row 4',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Strawberry',
                column2: 'Row 5',
                column3: 'Row 5',
                date: '11-12-18',
                type: 'search'
            }
        ];
        this.displayedRows = this.tableRows;
    }
}
