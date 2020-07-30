import { Component } from '@angular/core';

@Component({
    selector: 'fd-table-semantic-example',
    templateUrl: './table-semantic-example.component.html'
})
export class TableSemanticExampleComponent {
    selectMasterModel = false;

    tableRows: any[] = [
        {
            status: '',
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            checked: false
        },
        {
            status: 'valid',
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            checked: false
        },
        {
            status: '',
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            checked: false
        },
        {
            status: 'warning',
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            checked: false
        },
        {
            status: '',
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            checked: false
        },
        {
            status: 'information',
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            checked: false
        },
        {
            status: '',
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            checked: false
        },
        {
            status: 'error',
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            checked: false
        }
    ];

    select(index: number, checked: boolean): void {
        this.tableRows[index].checked = checked;
        this.selectMasterModel = this._allSelected();
    }

    selectMaster(checked: boolean): void {
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
