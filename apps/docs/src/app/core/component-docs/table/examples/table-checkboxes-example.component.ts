import { Component } from '@angular/core';

@Component({
    selector: 'fd-table-checkboxes-example',
    templateUrl: './table-checkboxes-example.component.html'
})
export class TableCheckboxesExampleComponent {
    selectMasterModel = false;

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

    select(index: number, checked: boolean): void {
        this.tableRows[index].checked = checked;
        this.selectMasterModel = this._allSelected();
    }

    selectMaster(checked: boolean) {
        this.selectMasterModel = checked;
        if (checked) {
            this._selectAll();
        } else {
            this._deselectAll();
        }
    }

    private _selectAll(): void {
        this.tableRows.forEach((row) => (row.checked = true));
    }

    private _deselectAll(): void {
        this.tableRows.forEach((row) => (row.checked = false));
    }

    private _allSelected(): boolean {
        return !this.tableRows.find((_row) => !_row.checked);
    }
}
