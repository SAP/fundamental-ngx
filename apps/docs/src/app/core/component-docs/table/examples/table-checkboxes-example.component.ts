import { Component } from '@angular/core';

@Component({
    selector: 'fd-table-checkboxes-example',
    templateUrl: './table-checkboxes-example.component.html'
})
export class TableCheckboxesExampleComponent {

    selectedRows = [];
    selectMasterModel = false;
    allSelected = false;

    tableRows = [
        {
            column1: 'Row 1',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            type: 'search',
            checked: false
        },
        {
            column1: 'Row 2',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            type: 'cart',
            checked: false
        },
        {
            column1: 'Row 3',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            type: 'calendar',
            checked: false
        },
        {
            column1: 'Row 4',
            column2: 'Row 4',
            column3: 'Row 4',
            date: '09-07-18',
            type: 'search',
            checked: false
        },
        {
            column1: 'Row 5',
            column2: 'Row 5',
            column3: 'Row 5',
            date: '09-07-18',
            type: 'search',
            checked: false
        }
    ];

    select(row: number): void {
        if (this.tableRows[row].checked === false) {
            this.selectedRows.push(row);
            this.tableRows[row].checked = true;
        } else {
            this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
            this.tableRows[row].checked = false;
        }

        this.allSelected = this.checkIfAllSelected();
    }

    selectMaster() {
        if (this.allSelected) {
            this.deselectAll();
            this.allSelected = false;
        } else {
            this.selectAll();
            this.allSelected = true;
        }
    }

    private selectAll(): void {
        this.tableRows.forEach((row, index) => {
            if (row.checked === false) {
                row.checked = true;
                this.selectedRows.push(index);
            }
        });
        this.allSelected = true;
    }

    private deselectAll(): void {
        this.tableRows.forEach(row => {
            row.checked = false;
        });
        this.allSelected = false;
        this.selectedRows = [];
    }

    private checkIfAllSelected(): boolean {
        let state = true;
        this.tableRows.forEach(row => {
            if (row.checked === false) {
                state = false;
            }
        });
        return state;
    }

}
