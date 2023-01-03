import { Component } from '@angular/core';
import { TableStatuses } from '@fundamental-ngx/core/table';
import { RangeSelector } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-table-semantic-example',
    templateUrl: './table-semantic-example.component.html'
})
export class TableSemanticExampleComponent {
    private readonly _rangeSelector = new RangeSelector();
    isAllSelected: boolean | null = false;

    tableRows: RowData[] = [
        {
            status: null,
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
            status: null,
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
            status: null,
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
            status: null,
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

    select(index: number, event: MouseEvent): void {
        // using rangeSelector utility to be able to select multiple rows while "shift" is pressed
        const checkedToggled = !this.tableRows[index].checked;
        this._rangeSelector.onRangeElementToggled(index, event);
        this._rangeSelector.applyValueToEachInRange((idx) => (this.tableRows[idx].checked = checkedToggled));
        this.isAllSelected = this._getSelectAllValue();
    }

    selectAll(checked: boolean): void {
        this.isAllSelected = checked;
        if (checked) {
            this._selectAll();
        } else {
            this._deselectAll();
        }
    }

    getRowAriaLabel(row: RowData, index: number): string {
        let ariaLabel = 'Select row ' + (index + 1);
        if (row.status) {
            ariaLabel += ', ' + row.status;
        }
        return ariaLabel;
    }

    private _selectAll(): void {
        this.tableRows.forEach((row) => (row.checked = true));
    }

    private _deselectAll(): void {
        this.tableRows.forEach((row) => (row.checked = false));
    }

    private _getSelectAllValue(): boolean | null {
        const checked = this.tableRows.filter((row) => row.checked);
        if (checked.length === this.tableRows.length) {
            return true;
        } else if (!checked.length) {
            return false;
        }
        // returning null to set selection state to "indeterminate"
        return null;
    }
}

interface RowData {
    status: TableStatuses | null;
    column1: string;
    column2: string;
    column3: string;
    date: string;
    checked: boolean;
}
