import { Component } from '@angular/core';
import { RangeSelector } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-table-checkboxes-example',
    templateUrl: './table-checkboxes-example.component.html'
})
export class TableCheckboxesExampleComponent {
    private readonly _rangeSelector = new RangeSelector();

    checkboxValue: boolean | null = false;
    checkboxValueCompact: boolean | null = false;
    checkboxValueCondensed: boolean | null = false;

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

    select(index: number, event: MouseEvent, size: string): void {
        // using rangeSelector utility to be able to select multiple rows while "shift" is pressed
        const checkedToggled = !this._getTable(size)[index].checked;
        this._rangeSelector.onRangeElementToggled(index, event);
        this._rangeSelector.applyValueToEachInRange((idx) => (this._getTable(size)[idx].checked = checkedToggled));
        this._setValue(size);
    }

    selectAll(checked: boolean, size: string): void {
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

    private _getSelectAllValue(size: string): boolean | null {
        const table = this._getTable(size);
        const checked = table.filter((row) => row.checked);
        if (checked.length === table.length) {
            return true;
        } else if (!checked.length) {
            return false;
        }
        // returning null to set selection state to "indeterminate"
        return null;
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
            this.checkboxValue = this._getSelectAllValue(size);
        } else if (size === 'compact') {
            this.checkboxValueCompact = this._getSelectAllValue(size);
        } else if (size === 'condensed') {
            this.checkboxValueCondensed = this._getSelectAllValue(size);
        }
    }
}
