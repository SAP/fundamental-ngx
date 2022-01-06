import { Component, ViewChild } from '@angular/core';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { TableComponent } from '@fundamental-ngx/core/table';
import { TableCustomDialogComponent } from './table-custom-dialog.component';

export interface DisplayedColumn {
    key: string;
    checked: boolean;
}

export interface CellData {
    column1: string;
    column2: string;
    column3: string;
    date: string;
    type: string;
}

const CELL_DATA: CellData[] = [
    { column1: 'Row 111', column2: 'Row 221', column3: 'Row 1', date: '09-07-18', type: 'search' },
    { column1: 'Row 112', column2: 'Row 222', column3: 'Row 2', date: '09-08-18', type: 'cart' },
    { column1: 'Row 113', column2: 'Row 223', column3: 'Row 3', date: '02-14-18', type: 'calendar' },
    { column1: 'Row 114', column2: 'Row 224', column3: 'Row 4', date: '12-30-17', type: 'search' },
    { column1: 'Row 115', column2: 'Row 225', column3: 'Row 5', date: '11-12-18', type: 'search' }
];

@Component({
    selector: 'fd-table-custom-columns-example',
    templateUrl: './table-custom-columns-example.component.html'
})
export class TableCustomColumnsExampleComponent {
    displayedColumns: string[];
    originalDisplayedColumns: DisplayedColumn[];
    dataSource = CELL_DATA;
    dialogRef: DialogRef;

    @ViewChild(TableComponent)
    tableComponent: TableComponent;

    constructor(private _dialogService: DialogService) {
        this.displayedColumns = Object.keys(this.dataSource[0]);
        this.originalDisplayedColumns = [];

        Object.keys(this.dataSource[0]).forEach((key) => {
            this.originalDisplayedColumns.push({ key, checked: true });
        });
    }

    openDialog(): void {
        const dialogRef = this._dialogService.open(TableCustomDialogComponent, {
            width: '350px',
            height: '370px',
            draggable: true,
            resizable: true,
            verticalPadding: false,
            data: {
                columns: this.originalDisplayedColumns
            }
        });

        dialogRef.afterClosed.subscribe(
            (columns) => {
                this.originalDisplayedColumns = [...columns];
                this._propagateChangeToDisplayedValue();
            },
            () => {
                console.log('closed without changes');
            }
        );
    }

    private _propagateChangeToDisplayedValue(): void {
        this.displayedColumns = [
            ...this.originalDisplayedColumns.filter((_col) => _col.checked).map((_col) => _col.key)
        ];
        this.tableComponent.reset(this.displayedColumns);
    }
}
