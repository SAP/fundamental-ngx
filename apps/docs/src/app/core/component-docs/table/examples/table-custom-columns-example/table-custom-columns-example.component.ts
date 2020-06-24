import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { DialogRef, DialogService, TableComponent, TableRowDirective } from '@fundamental-ngx/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface DisplayedColumn {
    key: string,
    checked: boolean
}

export interface CellData {
    column1: string;
    column2: string;
    column3: string;
    date: string;
    type: string;
}

const CELL_DATA: CellData[] = [
    { column2: 'Row 221', column1: 'Row 111', column3: 'Row 1', date: '09-07-18', type: 'search' },
    { column2: 'Row 222', column1: 'Row 112', column3: 'Row 2', date: '09-08-18', type: 'cart' },
    { column2: 'Row 223', column1: 'Row 113', column3: 'Row 3', date: '02-14-18', type: 'calendar' },
    { column2: 'Row 224', column1: 'Row 114', column3: 'Row 4', date: '12-30-17', type: 'search' },
    { column2: 'Row 225', column1: 'Row 115', column3: 'Row 5', date: '11-12-18', type: 'search' }
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

    constructor(
        private _dialogService: DialogService
    ) {
        this.displayedColumns = Object.keys(this.dataSource[0]);
        this.originalDisplayedColumns = [];

        Object.keys(this.dataSource[0]).forEach(key => {
            this.originalDisplayedColumns.push({ key: key, checked: true });
        });

    }

    shuffle() {
        this._shuffleArray(this.originalDisplayedColumns);
        this._propagateChangeToDisplayedValue();
        this.tableComponent.reset(this.displayedColumns);
    }

    handleChange(column: { key: string, checked: boolean }, checked?: boolean): void {
        column.checked = checked;
        this.displayedColumns = [...this.originalDisplayedColumns.filter(_col => _col.checked).map(_col => _col.key)];
        this.tableComponent.reset(this.displayedColumns);
    }


    openDialog(template: TemplateRef<any>): void {
        this.dialogRef = this._dialogService.open(template, {
            width: '350px',
            height: '370px',
            draggable: true,
            resizable: true,
            verticalPadding: false,
            backdropClickCloseable: false
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    dropHandle(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.originalDisplayedColumns, event.previousIndex, event.currentIndex);
        this._propagateChangeToDisplayedValue();

        this.tableComponent.reset(this.displayedColumns);
    }

    private _shuffleArray(array: any[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    private _propagateChangeToDisplayedValue(): void {
        this.displayedColumns.sort((a: string, b: string) => {
            if (this.originalDisplayedColumns.findIndex(_key => _key.key === a) <
                this.originalDisplayedColumns.findIndex(_key => _key.key === b)) {
                return -1;
            } else {
                return 1;
            }
        });
    }
}
