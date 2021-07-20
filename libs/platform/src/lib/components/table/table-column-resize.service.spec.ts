import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TABLE_RESIZER_BORDER_WIDTH, TableColumnResizeService } from './table-column-resize.service';
import { TableColumn } from './components/table-column/table-column';
import { TABLE_COLUMN_MIN_WIDTH } from './constants';

describe('TableColumnResizeService', () => {
    let service: TableColumnResizeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TableColumnResizeService]
        });
        service = TestBed.inject(TableColumnResizeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize service', () => {
        const columnIndex = 0;
        const tableColumn = { width: null } as TableColumn;

        const widthInPixels = 100;
        const cell = { nativeElement: { offsetWidth: widthInPixels } } as ElementRef;

        expect(service.getColumnWidthStyle(tableColumn, 0)).toEqual('auto');

        service.registerColumnCell(columnIndex, cell);
        service.initialize(0, false, 0);

        expect(service.getColumnWidthStyle({} as TableColumn, columnIndex)).toEqual(widthInPixels + 'px');
        expect(service.getPrevColumnsWidth(columnIndex + 1)).toEqual(widthInPixels);

    });

    it('should return column width based on column property', () => {
        const width = '100px';
        const tableColumn = { width: width } as TableColumn;

        expect(service.getColumnWidthStyle(tableColumn, 0)).toEqual(width);
    });

    it('should set resizer', () => {
        const position = 0;

        service.initialize(0, false, 0);
        service.setInitialResizerPosition(position, 0);

        expect(service.resizerPosition).toEqual(position - TABLE_RESIZER_BORDER_WIDTH);
    });

    it('should process resize', () => {
        const columnIndex = 0;
        const clientStartX = 0;
        const clientEndX = 100;
        const initialColumnWidth = 100;
        const cell = { nativeElement: { offsetWidth: initialColumnWidth } } as ElementRef;

        service.registerColumnCell(columnIndex, cell);
        service.initialize(0, false, 0);
        service.setInitialResizerPosition(0, columnIndex);

        service.startResize({ clientX: clientStartX } as MouseEvent);
        service.finishResize({ clientX: clientEndX } as MouseEvent);

        expect(service.getColumnWidthStyle({ } as TableColumn, columnIndex)).toEqual(
            (initialColumnWidth + clientEndX - clientStartX) + 'px'
        );
    });

    it('should set min column width if after resize it smaller', () => {
        const columnIndex = 0;
        const clientStartX = 0;
        const clientEndX = -80;
        const initialColumnWidth = 100;
        const cell = { nativeElement: { offsetWidth: initialColumnWidth } } as ElementRef;

        service.registerColumnCell(columnIndex, cell);
        service.initialize(0, false, 0);
        service.setInitialResizerPosition(0, columnIndex);

        service.startResize({ clientX: clientStartX } as MouseEvent);
        service.finishResize({ clientX: clientEndX } as MouseEvent);

        expect(service.getColumnWidthStyle({ } as TableColumn, columnIndex)).toEqual(
            TABLE_COLUMN_MIN_WIDTH + 'px'
        );
    });
});
