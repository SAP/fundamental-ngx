import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TABLE_RESIZER_BORDER_WIDTH, TableColumnResizeService } from './table-column-resize.service';
import { TableColumn } from './components/table-column/table-column';
import { TableColumnComponent } from './components/table-column/table-column.component';
import { TABLE_COLUMN_MIN_WIDTH } from './constants';
import { TableScrollDispatcherService } from './table-scroll-dispatcher.service';

describe('TableColumnResizeService', () => {
    let service: TableColumnResizeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TableColumnResizeService, TableScrollDispatcherService]
        });
        service = TestBed.inject(TableColumnResizeService);
        service.setTableRef({
            getMaxAllowedFreezableColumnsWidth: () => 1000,
            _freezableColumns: new Map([['name', 0]]),
            _tableWidthPx: 1400
        } as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return column width based on column property', () => {
        const width = '100px';
        const tableColumn = new TableColumnComponent(service);
        tableColumn.width = width;

        expect(service.getColumnWidthStyle(tableColumn.name)).toEqual(width);
    });

    it('should set resizer', () => {
        const position = 0;

        service.setColumnNames([]);
        service.setInitialResizerPosition(position, 'name');

        expect(service.resizerPosition).toEqual(position - TABLE_RESIZER_BORDER_WIDTH);
    });

    it('should process resize', () => {
        const clientStartX = 0;
        const clientEndX = 100;
        const initialColumnWidth = 100;
        const tableColumnNames = ['name'];
        const tableColumn = (<any>{ name: tableColumnNames[0], width: null }) as TableColumn;
        const tableColumnCell = {
            nativeElement: {
                getBoundingClientRect: () => ({ width: initialColumnWidth }),
                clientWidth: initialColumnWidth
            }
        } as ElementRef;

        service.registerColumnCell(tableColumn.name, tableColumnCell);
        service.setColumnNames(tableColumnNames);
        service.setInitialResizerPosition(0, tableColumn.name);

        service.startResize({ clientX: clientStartX } as MouseEvent);
        service.finishResize({ clientX: clientEndX } as MouseEvent);

        expect(service.getColumnWidthStyle(tableColumn.name)).toEqual(
            initialColumnWidth + clientEndX - clientStartX + 'px'
        );
    });

    it('should set min column width if after resize it smaller', () => {
        const clientStartX = 0;
        const clientEndX = -80;
        const initialColumnWidth = 100;
        const tableColumnNames = ['name'];
        const tableColumn = (<any>{ name: tableColumnNames[0], width: null }) as TableColumn;
        const tableColumnCell = {
            nativeElement: {
                getBoundingClientRect: () => ({ width: initialColumnWidth }),
                clientWidth: initialColumnWidth
            }
        } as ElementRef;

        service.registerColumnCell(tableColumn.name, tableColumnCell);
        service.setColumnNames(tableColumnNames);
        service.setInitialResizerPosition(0, tableColumn.name);

        service.startResize({ clientX: clientStartX } as MouseEvent);
        service.finishResize({ clientX: clientEndX } as MouseEvent);

        expect(service.getColumnWidthStyle(tableColumn.name)).toEqual(TABLE_COLUMN_MIN_WIDTH + 'px');
    });
});
