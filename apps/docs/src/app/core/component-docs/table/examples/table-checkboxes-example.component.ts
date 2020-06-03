import { Component } from '@angular/core';

@Component({
    selector: 'fd-table-checkboxes-example',
    templateUrl: './table-checkboxes-example.component.html'
})
export class TableCheckboxesExampleComponent {
    selectMasterModel = false;
    selectMasterModelCompact = false;
    selectMasterModelCondensed = false;

    tableRows = [
        {
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            checked: false
        }
    ];

    tableRowsCompact = [
        {
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            checked: false
        }
    ];

    tableRowsCondensed = [
        {
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            checked: false
        }
    ];

    select(index: number, checked: boolean, size: string): void {
        this._getTable(size)[index].checked = checked;
        this._setMasterModel(size);
    }

    selectMaster(checked: boolean, size: string) {
        if (size === 'cozy') {
            this.selectMasterModel = checked;
        } else if (size === 'compact') {
            this.selectMasterModelCompact = checked;
        } else if (size === 'condensed') {
            this.selectMasterModelCondensed = checked;
        }
        if (checked) {
            this._selectAll(size);
        } else {
            this._deselectAll(size);
        }
    }

    private _selectAll(size: string): void {
        this._getTable(size).forEach((row) => (row.checked = true));
    }

    private _deselectAll(size: string): void {
        this._getTable(size).forEach((row) => (row.checked = false));
    }

    private _allSelected(size: string): boolean {
        return !this._getTable(size).find((_row) => !_row.checked);
    }

    private _getTable(size: string) {
        let table = this.tableRows;
        if (size === 'compact') {
            table = this.tableRowsCompact;
        } else if (size === 'condensed') {
            table = this.tableRowsCondensed;
        }
        return table;
    }

    private _setMasterModel(size: string) {
        if (size === 'cozy') {
            this.selectMasterModel = this._allSelected(size);
        } else if (size === 'compact') {
            this.selectMasterModelCompact = this._allSelected(size);
        } else if (size === 'condensed') {
            this.selectMasterModelCondensed = this._allSelected(size);
        }
    }
}
