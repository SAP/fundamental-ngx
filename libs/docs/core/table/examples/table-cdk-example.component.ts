import { CdkDrag, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkTable, CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { TableModule } from '@fundamental-ngx/core/table';

export interface CellData {
    column1: string;
    column2: string;
    column3: string;
    date: string;
    type: string;
}
const CELL_DATA: CellData[] = [
    { column1: 'Row 1', column2: 'Row 1', column3: 'Row 1', date: '09-07-18', type: 'search' },
    { column1: 'Row 2', column2: 'Row 2', column3: 'Row 2', date: '09-08-18', type: 'cart' },
    { column1: 'Row 3', column2: 'Row 3', column3: 'Row 3', date: '02-14-18', type: 'calendar' },
    { column1: 'Row 4', column2: 'Row 4', column3: 'Row 4', date: '12-30-17', type: 'search' },
    { column1: 'Row 5', column2: 'Row 5', column3: 'Row 5', date: '11-12-18', type: 'search' }
];

@Component({
    selector: 'fd-table-cdk-example',
    templateUrl: './table-cdk-example.component.html',
    styleUrls: ['table-cdk-example.component.scss'],
    imports: [TableModule, CdkTableModule, CdkDropList, CdkDragHandle, LinkComponent, IconComponent, CdkDrag]
})
export class TableCdkExampleComponent {
    @ViewChild('table') table: CdkTable<Record<string, any>[]>;

    displayedColumns: string[] = ['column1', 'column2', 'column3', 'date', 'type'];
    dataSource = CELL_DATA;

    dropRow(event): void {
        const previousIndex = this.dataSource.findIndex((d) => d === event.item.data);
        moveItemInArray(this.dataSource, previousIndex, event.currentIndex);
        this.table.renderRows();
    }
}
