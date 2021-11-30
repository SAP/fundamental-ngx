import { Component } from '@angular/core';

@Component({
    selector: 'fd-table-checkboxes-example',
    templateUrl: './table-checkboxes-example.component.html'
})
export class TableCheckboxesExampleComponent {
    checkboxValue = false;
    checkboxValueCompact = false;
    checkboxValueCondensed = false;

    tableRows: any[] = [
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
            type: 'search',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            type: 'cart',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            type: 'calendar',
            checked: false
        }
    ];

    tableRowsCondensed: Record<string, any>[] = [
        {
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            type: 'search',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            type: 'cart',
            checked: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            type: 'calendar',
            checked: false
        }
    ];

    select(index: number, checked: boolean, size: string): void {
        this._getTable(size)[index].checked = checked;
        this._setValue(size);
    }

    selectMaster(checked: boolean, size: string): void {
        if (size === 'cozy') {
            this.checkboxValue = checked;
        } else if (size === 'compact') {
            this.checkboxValueCompact = checked;
        } else if (size === 'condensed') {
            this.checkboxValueCondensed = checked;
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

    private _getTable(size: string): any[] {
        let table = this.tableRows;
        if (size === 'compact') {
            table = this.tableRowsCompact;
        } else if (size === 'condensed') {
            table = this.tableRowsCondensed;
        }
        return table;
    }

    private _setValue(size: string): void {
        if (size === 'cozy') {
            this.checkboxValue = this._allSelected(size);
        } else if (size === 'compact') {
            this.checkboxValueCompact = this._allSelected(size);
        } else if (size === 'condensed') {
            this.checkboxValueCondensed = this._allSelected(size);
        }
    }
}
