import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TABLE_RESIZER_BORDER_WIDTH, TableColumnResizeService } from './table-column-resize.service';
import { TableColumn } from './components/table-column/table-column';
import { TABLE_COLUMN_MIN_WIDTH } from './constants';
import { TableScrollDispatcherService } from './table-scroll-dispatcher.service';

describe('TableColumnResizeService', () => {
    let service: TableColumnResizeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TableColumnResizeService, TableScrollDispatcherService]
        });
        service = TestBed.inject(TableColumnResizeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize service', () => {
        const columnNames = ['name'];
        const widthInPixels = 100;
        const tableColumn = { name: columnNames[0], width: null } as TableColumn;
        const tableColumnCell = { nativeElement: { offsetWidth: widthInPixels } } as ElementRef;

        expect(service.getColumnWidthStyle(tableColumn)).toEqual('auto');

        service.registerColumnCell(tableColumn.name, tableColumnCell);
        service.setColumnsWidth(columnNames, null, 0);

        expect(service.getColumnWidthStyle(tableColumn)).toEqual(widthInPixels + 'px');
    });

    it('should return column width based on column property', () => {
        const width = '100px';
        const tableColumn = { name: 'name', width: width } as TableColumn;

        expect(service.getColumnWidthStyle(tableColumn)).toEqual(width);
    });

    it('should set resizer', () => {
        const position = 0;

        service.setColumnsWidth([], null, 0);
        service.setInitialResizerPosition(position, 'name');

        expect(service.resizerPosition).toEqual(position - TABLE_RESIZER_BORDER_WIDTH);
    });

    it('should process resize', () => {
        const columnIndex = 0;
        const clientStartX = 0;
        const clientEndX = 100;
        const initialColumnWidth = 100;
        const tableColumnNames = ['name'];
        const tableColumn = { name: tableColumnNames[0], width: null } as TableColumn;
        const tableColumnCell = { nativeElement: { offsetWidth: initialColumnWidth } } as ElementRef;

        service.registerColumnCell(tableColumn.name, tableColumnCell);
        service.setColumnsWidth(tableColumnNames, null, 0);
        service.setInitialResizerPosition(0, tableColumn.name);

        service.startResize({ clientX: clientStartX } as MouseEvent);
        service.finishResize({ clientX: clientEndX } as MouseEvent);

        expect(service.getColumnWidthStyle(tableColumn)).toEqual(
            (initialColumnWidth + clientEndX - clientStartX) + 'px'
        );
    });

    it('should set min column width if after resize it smaller', () => {
        const columnIndex = 0;
        const clientStartX = 0;
        const clientEndX = -80;
        const initialColumnWidth = 100;
        const tableColumnNames = ['name'];
        const tableColumn = { name: tableColumnNames[0], width: null } as TableColumn;
        const tableColumnCell = { nativeElement: { offsetWidth: initialColumnWidth } } as ElementRef;

        service.registerColumnCell(tableColumn.name, tableColumnCell);
        service.setColumnsWidth(tableColumnNames, null, 0);
        service.setInitialResizerPosition(0, tableColumn.name);

        service.startResize({ clientX: clientStartX } as MouseEvent);
        service.finishResize({ clientX: clientEndX } as MouseEvent);

        expect(service.getColumnWidthStyle(tableColumn)).toEqual(
            TABLE_COLUMN_MIN_WIDTH + 'px'
        );
    });
});
