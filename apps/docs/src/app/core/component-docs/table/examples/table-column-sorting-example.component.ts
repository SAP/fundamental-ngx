import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface ExampleRow {
    column1: any;
    column2?: any;
    column3?: any;
    date?: any;
    type?: any;
}

@Component({
    selector: 'fd-table-column-sorting-example',
    templateUrl: './table-column-sorting-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnSortingExampleComponent implements OnInit {
    tableRows: ExampleRow[];
    displayedRows: ExampleRow[];
    ascending = true;
    filterVal = '';

    changeSort(asc: boolean): void {
        this.ascending = asc;
    }

    ngOnInit(): void {
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
