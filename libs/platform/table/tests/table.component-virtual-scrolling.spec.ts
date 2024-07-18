import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
    TableDataProvider,
    TableDataSource,
    TableState,
    TableVirtualScrollDirective
} from '@fundamental-ngx/platform/table-helpers';
import { Observable, of } from 'rxjs';
import { SourceItem, generateItems } from './helpers';
import { TableComponent } from '../table.component';
import { PlatformTableModule } from '../table.module';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import Spy = jasmine.Spy;

class TableDataExampleProvider extends TableDataProvider<SourceItem> {
    items: SourceItem[] = [];
    totalItems = 0;

    private readonly ALL_ITEMS = generateItems(200);

    fetch(state: TableState): Observable<SourceItem[]> {
        const { currentPage, pageSize } = state.page;

        const items = [...this.ALL_ITEMS];

        this.totalItems = items.length;

        const startIndex = (currentPage - 1) * pageSize;
        this.items = items.slice(startIndex, startIndex + pageSize);

        return of(this.items);
    }
}

@Component({
    template: `
        <fdp-table
            [dataSource]="source"
            fdCompact
            [virtualScroll]="true"
            [pageScrolling]="true"
            [pageSize]="50"
            bodyHeight="20rem"
        >
            <fdp-column name="name" key="name" label="Name"></fdp-column>
            <fdp-column name="description" key="description" label="Description"></fdp-column>
            <fdp-column name="status" key="status" label="Status"></fdp-column>
        </fdp-table>
    `
})
class TableHostComponent {
    @ViewChild(TableComponent) table: TableComponent;
    @ViewChild(TableVirtualScrollDirective) virtualScrollDirective: TableVirtualScrollDirective;

    source = new TableDataSource(new TableDataExampleProvider());
}

describe('TableComponent Virtual Scrolling', async () => {
    let hostComponent: TableHostComponent;
    let fixture: ComponentFixture<TableHostComponent>;
    let tableComponent: TableComponent<SourceItem>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, RouterModule, RouterTestingModule],
            declarations: [TableHostComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableHostComponent);
        hostComponent = fixture.componentInstance;

        const originFetch = hostComponent.source.fetch;
        spyOn(hostComponent.source, 'fetch').and.callFake((state: TableState) =>
            originFetch.call(hostComponent.source, state)
        );

        fixture.detectChanges();

        tableComponent = hostComponent.table;
    });

    describe('Virtual Scroll - Scroll Whole Row tests', () => {
        let focusCellMock: Spy, setRowsInViewportMock: Spy, setTableStateMock: Spy, mockScrollbarScrollMock: Spy;
        beforeEach(() => {
            hostComponent.virtualScrollDirective.scrollWholeRows = true;
            hostComponent.virtualScrollDirective.rowHeight = 44;
            const tableState = {
                columnKeys: [],
                sortBy: [],
                filterBy: [],
                groupBy: [],
                columns: [],
                searchInput: {
                    category: null,
                    text: ''
                },
                freezeToColumn: null,
                freezeToEndColumn: null,
                page: {
                    pageSize: 0,
                    currentPage: 1
                },
                scrollTopPosition: 400
            };
            tableComponent.setTableState(tableState);
            hostComponent.virtualScrollDirective.calculateVirtualScrollRows();
            fixture.detectChanges();
            focusCellMock = spyOn(tableComponent._focusableGrid, 'focusCell').and.callThrough();
            setRowsInViewportMock = spyOn(tableComponent, 'setRowsInViewport');
            setTableStateMock = spyOn(tableComponent, 'setTableState');
            mockScrollbarScrollMock = spyOn(tableComponent.tableScrollMockContainer.nativeElement, 'scrollBy');
            focusCellMock.calls.reset();
            setRowsInViewportMock.calls.reset();
            setTableStateMock.calls.reset();
            mockScrollbarScrollMock.calls.reset();
        });

        describe('Should handle keydown events', () => {
            it('Should handle up arrow press when the focused cell is at rowIndex: 0', () => {
                tableComponent._focusableGrid.focusCell({ rowIndex: 0, colIndex: 1 });
                hostComponent.virtualScrollDirective.calculateVirtualScrollRows();
                hostComponent.virtualScrollDirective._keydownHandler(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
                expect(focusCellMock).toHaveBeenCalledWith({ colIndex: 1, rowIndex: 1 });
                expect(setRowsInViewportMock).toHaveBeenCalledWith(8, 6);
                expect(setTableStateMock).toHaveBeenCalledWith({
                    ...tableComponent.getTableState(),
                    scrollTopPosition: 352
                });
            });
            it('Should handle down arrow press when the focused cell is the last visible cell', () => {
                tableComponent._focusableGrid.focusCell({ rowIndex: 5, colIndex: 1 });
                hostComponent.virtualScrollDirective.calculateVirtualScrollRows();
                hostComponent.virtualScrollDirective._keydownHandler(
                    new KeyboardEvent('keydown', { key: 'ArrowDown' })
                );
                expect(setRowsInViewportMock).toHaveBeenCalledWith(9, 6);
                expect(setTableStateMock).toHaveBeenCalledWith({
                    ...tableComponent.getTableState(),
                    scrollTopPosition: 396
                });
            });
            it('Should automatically turn on virtualScroll if scrollWholeRows is true', () => {
                hostComponent.virtualScrollDirective.virtualScroll = false;
                hostComponent.virtualScrollDirective.scrollWholeRows = true;
                hostComponent.virtualScrollDirective.ngOnInit();
                expect(hostComponent.virtualScrollDirective.virtualScroll).toBeTrue();
            });
            it('Should calculateVirtualScrollRows for scrollWholeRows', () => {
                hostComponent.virtualScrollDirective.calculateVirtualScrollRows();
                expect(hostComponent.virtualScrollDirective.virtualScrollTotalHeight).toBe(1892);
                expect(tableComponent.tableScrollMockContainer.nativeElement.style.maxHeight).toBe('20rem');
                expect(setRowsInViewportMock).toHaveBeenCalledWith(9, 6);
                expect(setTableStateMock).toHaveBeenCalledWith({
                    ...tableComponent.getTableState(),
                    scrollTopPosition: 396
                });
            });
            it('Should handle wheel events', fakeAsync(() => {
                hostComponent.virtualScrollDirective.listenOnVirtualScroll();
                tableComponent.tableContainer.nativeElement.dispatchEvent(new WheelEvent('wheel', { deltaY: 10 }));
                tick(20);
                expect(mockScrollbarScrollMock).toHaveBeenCalledWith({ top: 44 });
                expect(setRowsInViewportMock).toHaveBeenCalledWith(10, 6);
                expect(setTableStateMock).toHaveBeenCalledWith({
                    ...tableComponent.getTableState(),
                    scrollTopPosition: 440
                });
                mockScrollbarScrollMock.calls.reset();
                setRowsInViewportMock.calls.reset();
                setTableStateMock.calls.reset();
                tableComponent.tableContainer.nativeElement.dispatchEvent(new WheelEvent('wheel', { deltaY: -10 }));
                tick(20);
                expect(mockScrollbarScrollMock).toHaveBeenCalledWith({ top: -44 });
                expect(setRowsInViewportMock).toHaveBeenCalledWith(9, 6);
                expect(setTableStateMock).toHaveBeenCalledWith({
                    ...tableComponent.getTableState(),
                    scrollTopPosition: 396
                });
                flush();
            }));
            it('Should handle mock scrollbar events', fakeAsync(() => {
                hostComponent.virtualScrollDirective.listenOnVirtualScroll();
                tableComponent.tableScrollMockContainer.nativeElement.scrollTop = 100;
                tableComponent.tableScrollMockContainer.nativeElement.dispatchEvent(new Event('scroll'));
                tick(20);
                expect(setRowsInViewportMock).toHaveBeenCalledWith(12, 6);
                expect(setTableStateMock).toHaveBeenCalledWith({
                    ...tableComponent.getTableState(),
                    scrollTopPosition: 528
                });
                setRowsInViewportMock.calls.reset();
                setTableStateMock.calls.reset();
                tableComponent.tableScrollMockContainer.nativeElement.scrollTop = 50;
                tableComponent.tableScrollMockContainer.nativeElement.dispatchEvent(new Event('scroll'));
                tick(20);
                expect(setRowsInViewportMock).toHaveBeenCalledWith(11, 6);
                expect(setTableStateMock).toHaveBeenCalledWith({
                    ...tableComponent.getTableState(),
                    scrollTopPosition: 484
                });
                flush();
            }));
        });
    });
});
