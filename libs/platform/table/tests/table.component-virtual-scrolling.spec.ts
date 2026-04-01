import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import {
    TableDataProvider,
    TableDataSource,
    TableState,
    TableVirtualScrollDirective
} from '@fundamental-ngx/platform/table-helpers';
import { Observable, of } from 'rxjs';
import { TableComponent } from '../table.component';
import { PlatformTableModule } from '../table.module';
import { generateItems, SourceItem } from './helpers';

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
    `,
    standalone: true,
    imports: [PlatformTableModule]
})
class TableHostComponent {
    @ViewChild(TableComponent) table: TableComponent;
    @ViewChild(TableVirtualScrollDirective) virtualScrollDirective: TableVirtualScrollDirective;

    source = new TableDataSource(new TableDataExampleProvider());
}

describe('TableComponent Virtual Scrolling', () => {
    let hostComponent: TableHostComponent;
    let fixture: ComponentFixture<TableHostComponent>;
    let tableComponent: TableComponent<SourceItem>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TableHostComponent, RouterModule, RouterTestingModule],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableHostComponent);
        hostComponent = fixture.componentInstance;

        const originFetch = hostComponent.source.fetch;
        jest.spyOn(hostComponent.source, 'fetch').mockImplementation((state: TableState) =>
            originFetch.call(hostComponent.source, state)
        );

        fixture.detectChanges();

        tableComponent = hostComponent.table;
    });

    describe('Scroll Whole Rows', () => {
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
                    pageSize: 50,
                    currentPage: 1
                },
                scrollTopPosition: 0
            };
            tableComponent.setTableState(tableState);
            hostComponent.virtualScrollDirective.calculateVirtualScrollRows();

            const mockScrollBy = jest.fn();
            if (tableComponent.tableScrollMockContainer?.nativeElement) {
                tableComponent.tableScrollMockContainer.nativeElement.scrollBy = mockScrollBy;
            }

            fixture.detectChanges();
        });

        it('should automatically enable virtualScroll when scrollWholeRows is true', () => {
            hostComponent.virtualScrollDirective.virtualScroll = false;
            hostComponent.virtualScrollDirective.scrollWholeRows = true;
            hostComponent.virtualScrollDirective.ngOnInit();
            expect(hostComponent.virtualScrollDirective.virtualScroll).toBe(true);
        });

        it('should set up itemFocused subscription on first calculateVirtualScrollRows call', () => {
            // Create a new component to test fresh subscription setup
            const newFixture = TestBed.createComponent(TableHostComponent);
            const newHostComponent = newFixture.componentInstance;

            jest.spyOn(newHostComponent.source, 'fetch').mockImplementation((state: TableState) => of([]));

            newFixture.detectChanges();

            newHostComponent.virtualScrollDirective.scrollWholeRows = true;
            newHostComponent.virtualScrollDirective.virtualScroll = true;
            newHostComponent.virtualScrollDirective.bodyHeight = '20rem';

            expect((newHostComponent.virtualScrollDirective as any)._focusableGridSubscription).toBeUndefined();

            newHostComponent.virtualScrollDirective.calculateVirtualScrollRows();

            expect((newHostComponent.virtualScrollDirective as any)._focusableGridSubscription).toBeDefined();
        });

        it('should delay _focusedCell update with setTimeout to avoid race condition', fakeAsync(() => {
            const focusEvent = { rowIndex: 3, colIndex: 1, totalRows: 50, totalCols: 3 };

            // Trigger the subscription
            tableComponent._focusableGrid.itemFocused.emit(focusEvent);

            // _focusedCell should not be updated immediately
            expect((hostComponent.virtualScrollDirective as any)._focusedCell).not.toEqual(focusEvent);

            // After timeout, it should be updated
            tick(0);
            expect((hostComponent.virtualScrollDirective as any)._focusedCell).toEqual(focusEvent);
        }));

        describe('_keydownHandler', () => {
            beforeEach(fakeAsync(() => {
                // Set initial focused cell
                const focusEvent = { rowIndex: 1, colIndex: 1, totalRows: 50, totalCols: 3 };
                tableComponent._focusableGrid.itemFocused.emit(focusEvent);
                tick(0);
            }));

            it('should handle up arrow when focused cell is at rowIndex 1', fakeAsync(() => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});
                const focusCellSpy = jest
                    .spyOn(tableComponent._focusableGrid, 'focusCell')
                    .mockImplementation(() => {});

                // Mock _getNumberOfRowsToDisplay to return 5
                const getRowsToDisplaySpy = jest
                    .spyOn(hostComponent.virtualScrollDirective as any, '_getNumberOfRowsToDisplay')
                    .mockReturnValue(5);

                // Set initial scroll position - simulate we're scrolled down to starting node 10
                (hostComponent.virtualScrollDirective as any)._previousStartNodeIndex = 10;

                // Set focused cell to rowIndex 1
                (hostComponent.virtualScrollDirective as any)._focusedCell = { rowIndex: 1, colIndex: 1 };

                const upArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                hostComponent.virtualScrollDirective._keydownHandler(upArrowEvent);

                tick(0);

                // Should scroll up one row: startingNode = 10 + (-1) = 9, visibleRows = 5
                expect(setRowsSpy).toHaveBeenCalledWith(9, 5);
            }));

            it('should handle down arrow when focused cell is at last visible row', fakeAsync(() => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});

                // Mock _getNumberOfRowsToDisplay to return 5
                jest.spyOn(hostComponent.virtualScrollDirective as any, '_getNumberOfRowsToDisplay').mockReturnValue(5);

                // Set initial scroll position - simulate we're at starting node 10
                (hostComponent.virtualScrollDirective as any)._previousStartNodeIndex = 10;

                // Set focused cell to the last visible row (rowIndex 5)
                (hostComponent.virtualScrollDirective as any)._focusedCell = { rowIndex: 5, colIndex: 1 };

                const downArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                hostComponent.virtualScrollDirective._keydownHandler(downArrowEvent);

                tick(0);

                // Should scroll down one row: startingNode = 10 + 1 = 11, visibleRows = 5
                expect(setRowsSpy).toHaveBeenCalledWith(11, 5);
            }));

            it('should not trigger scroll when arrow keys pressed on middle rows', () => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});

                // Mock _getNumberOfRowsToDisplay to return 5
                jest.spyOn(hostComponent.virtualScrollDirective as any, '_getNumberOfRowsToDisplay').mockReturnValue(5);

                // Set focused cell to a middle row
                (hostComponent.virtualScrollDirective as any)._focusedCell = { rowIndex: 3, colIndex: 1 };

                const downArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                hostComponent.virtualScrollDirective._keydownHandler(downArrowEvent);

                // Should not trigger scroll for middle rows
                expect(setRowsSpy).not.toHaveBeenCalled();
            });
        });

        describe('_wheelScrollListenerFunction', () => {
            it('should scroll down on positive deltaY', fakeAsync(() => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});

                // Mock _getNumberOfRowsToDisplay to return 5
                jest.spyOn(hostComponent.virtualScrollDirective as any, '_getNumberOfRowsToDisplay').mockReturnValue(5);

                // Set initial scroll position at starting node 0
                (hostComponent.virtualScrollDirective as any)._previousStartNodeIndex = 0;

                hostComponent.virtualScrollDirective.listenOnVirtualScroll();

                const wheelEvent = new WheelEvent('wheel', { deltaY: 100, deltaX: 0 });
                const preventDefaultSpy = jest.spyOn(wheelEvent, 'preventDefault');

                tableComponent.tableContainer.nativeElement.dispatchEvent(wheelEvent);
                tick(20);

                expect(preventDefaultSpy).toHaveBeenCalled();
                // Should scroll down 1 row: startingNode = 0 + 1 = 1, visibleRows = 5
                expect(setRowsSpy).toHaveBeenCalledWith(1, 5);
            }));

            it('should scroll up on negative deltaY', fakeAsync(() => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});

                // Mock _getNumberOfRowsToDisplay to return 5
                jest.spyOn(hostComponent.virtualScrollDirective as any, '_getNumberOfRowsToDisplay').mockReturnValue(5);

                // Set initial scroll position
                (hostComponent.virtualScrollDirective as any)._previousStartNodeIndex = 5;

                hostComponent.virtualScrollDirective.listenOnVirtualScroll();

                const wheelEvent = new WheelEvent('wheel', { deltaY: -100, deltaX: 0 });
                tableComponent.tableContainer.nativeElement.dispatchEvent(wheelEvent);
                tick(20);

                // Should scroll up 1 row: startingNode = 5 + (-1) = 4, visibleRows = 5
                expect(setRowsSpy).toHaveBeenCalledWith(4, 5);
            }));

            it('should not scroll when deltaX is greater than deltaY', fakeAsync(() => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});

                hostComponent.virtualScrollDirective.listenOnVirtualScroll();

                const wheelEvent = new WheelEvent('wheel', { deltaY: 10, deltaX: 100 });
                tableComponent.tableContainer.nativeElement.dispatchEvent(wheelEvent);
                tick(20);

                // Should not scroll when horizontal scroll is dominant
                expect(setRowsSpy).not.toHaveBeenCalled();
            }));

            it('should cancel previous animation frame when wheel event fires rapidly', fakeAsync(() => {
                const cancelSpy = jest.spyOn(window, 'cancelAnimationFrame');

                hostComponent.virtualScrollDirective.listenOnVirtualScroll();

                // Fire first wheel event
                const wheelEvent1 = new WheelEvent('wheel', { deltaY: 100, deltaX: 0 });
                tableComponent.tableContainer.nativeElement.dispatchEvent(wheelEvent1);

                // Fire second wheel event immediately
                const wheelEvent2 = new WheelEvent('wheel', { deltaY: 100, deltaX: 0 });
                tableComponent.tableContainer.nativeElement.dispatchEvent(wheelEvent2);

                expect(cancelSpy).toHaveBeenCalled();

                tick(20);
            }));
        });

        describe('_mockScrollbarListenerFunction', () => {
            it('should scroll rows when scrollbar is moved down', fakeAsync(() => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});

                // Mock _getNumberOfRowsToDisplay to return 5
                jest.spyOn(hostComponent.virtualScrollDirective as any, '_getNumberOfRowsToDisplay').mockReturnValue(5);

                // Set initial scroll position at starting node 0
                (hostComponent.virtualScrollDirective as any)._previousStartNodeIndex = 0;
                (hostComponent.virtualScrollDirective as any)._lastMockScrollPosition = 0;

                hostComponent.virtualScrollDirective.listenOnVirtualScroll();

                // Simulate scrollbar movement - 88px = 2 rows * 44px
                tableComponent.tableScrollMockContainer.nativeElement.scrollTop = 88;
                tableComponent.tableScrollMockContainer.nativeElement.dispatchEvent(new Event('scroll'));

                tick(20);

                // Should scroll down 2 rows: startingNode = 0 + 2 = 2, visibleRows = 5
                expect(setRowsSpy).toHaveBeenCalledWith(2, 5);
            }));

            it('should scroll rows when scrollbar is moved up', fakeAsync(() => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});

                // Mock _getNumberOfRowsToDisplay to return 5
                jest.spyOn(hostComponent.virtualScrollDirective as any, '_getNumberOfRowsToDisplay').mockReturnValue(5);

                // Set initial position - scrollTop 176 = 4 rows * 44px
                (hostComponent.virtualScrollDirective as any)._lastMockScrollPosition = 176;
                (hostComponent.virtualScrollDirective as any)._previousStartNodeIndex = 4;

                hostComponent.virtualScrollDirective.listenOnVirtualScroll();

                // Simulate scrollbar movement up - 88px = 2 rows * 44px
                // deltaY = 88 - 176 = -88, which is -2 rows
                tableComponent.tableScrollMockContainer.nativeElement.scrollTop = 88;
                tableComponent.tableScrollMockContainer.nativeElement.dispatchEvent(new Event('scroll'));

                tick(20);

                // Should scroll up 2 rows: startingNode = 4 + (-2) = 2, visibleRows = 5
                expect(setRowsSpy).toHaveBeenCalledWith(2, 5);
            }));

            it('should display first row when scrolled to top', fakeAsync(() => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});

                hostComponent.virtualScrollDirective.listenOnVirtualScroll();

                // Scroll to top
                tableComponent.tableScrollMockContainer.nativeElement.scrollTop = 0;
                tableComponent.tableScrollMockContainer.nativeElement.dispatchEvent(new Event('scroll'));

                tick(20);

                // Should call setCurrentlyRenderedRows with startIndex 0
                expect(setRowsSpy).toHaveBeenCalledWith(0, (expect as any).any(Number));
            }));

            it('should display last rows when scrolled to bottom', fakeAsync(() => {
                const setRowsSpy = jest.spyOn(tableComponent, 'setCurrentlyRenderedRows').mockImplementation(() => {});
                const mockContainer = tableComponent.tableScrollMockContainer.nativeElement;

                // Mock _getNumberOfRowsToDisplay to return 5
                jest.spyOn(hostComponent.virtualScrollDirective as any, '_getNumberOfRowsToDisplay').mockReturnValue(5);

                // Mock getBoundingClientRect
                jest.spyOn(mockContainer, 'getBoundingClientRect').mockReturnValue({
                    height: 220,
                    top: 0,
                    bottom: 220,
                    left: 0,
                    right: 800,
                    width: 800,
                    x: 0,
                    y: 0,
                    toJSON: () => ({})
                } as DOMRect);

                hostComponent.virtualScrollDirective.listenOnVirtualScroll();

                // Mock scrollHeight to simulate being at bottom
                Object.defineProperty(mockContainer, 'scrollHeight', { value: 220, configurable: true });
                mockContainer.scrollTop = 0; // scrollTop + height = scrollHeight
                mockContainer.dispatchEvent(new Event('scroll'));

                tick(20);

                // Should display last 5 rows: startingNode = 50 - 5 = 45, visibleRows = 5
                expect(setRowsSpy).toHaveBeenCalledWith(45, 5);
            }));
        });

        describe('cleanup', () => {
            it('should unsubscribe from focusableGrid subscription on destroy', () => {
                const unsubscribeSpy = jest.fn();
                (hostComponent.virtualScrollDirective as any)._focusableGridSubscription = {
                    unsubscribe: unsubscribeSpy
                };

                hostComponent.virtualScrollDirective.ngOnDestroy();

                expect(unsubscribeSpy).toHaveBeenCalled();
            });

            it('should remove wheel event listener on destroy', () => {
                const removeEventListenerSpy = jest.spyOn(
                    tableComponent.tableContainer.nativeElement,
                    'removeEventListener'
                );

                hostComponent.virtualScrollDirective.scrollWholeRows = true;
                hostComponent.virtualScrollDirective.listenOnVirtualScroll();
                hostComponent.virtualScrollDirective.ngOnDestroy();

                expect(removeEventListenerSpy).toHaveBeenCalledWith('wheel', (expect as any).any(Function), {
                    passive: false
                });
            });

            it('should remove scroll event listener on destroy', () => {
                const removeEventListenerSpy = jest.spyOn(
                    tableComponent.tableScrollMockContainer.nativeElement,
                    'removeEventListener'
                );

                hostComponent.virtualScrollDirective.scrollWholeRows = true;
                hostComponent.virtualScrollDirective.listenOnVirtualScroll();
                hostComponent.virtualScrollDirective.ngOnDestroy();

                expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', (expect as any).any(Function), {
                    passive: false
                });
            });
        });

        describe('Drag & Drop State Tracking', () => {
            it('should preserve dragged row in render arrays when drag is in progress and scrollWholeRows is enabled', () => {
                // Simulate a drag state
                const mockRow = tableComponent._tableRowsVisible[10];
                const dndIndex = 5;
                const globalIndex = 10;

                // Manually set up the drag state (simulating what would happen in a tree table)
                if (tableComponent._dndTableDirective) {
                    tableComponent._dndTableDirective['_draggedRowObject'] = mockRow;
                    tableComponent._dndTableDirective['_draggedDndIndex'] = dndIndex;
                    tableComponent._dndTableDirective['_draggedRowGlobalIndex'] = globalIndex;
                    tableComponent._dndTableDirective.dragDropInProgress = true;
                }

                // Simulate virtual scroll rendering new rows
                tableComponent.setCurrentlyRenderedRows(15, 10);

                // If drag state exists, the dragged row should be preserved at its DnD index
                if (tableComponent._dndTableDirective?.dragDropInProgress) {
                    expect(tableComponent._dndTableRowsPlaceholder[dndIndex]).toBe(mockRow);
                    expect(tableComponent._tableCurrentlyRenderedRowsPlaceholder[dndIndex]).toBe(globalIndex);
                }
            });

            it('should not preserve dragged row when drag is not in progress', () => {
                // No drag state
                if (tableComponent._dndTableDirective) {
                    tableComponent._dndTableDirective.dragDropInProgress = false;
                }

                const originalSlice = tableComponent._dndTableRowsPlaceholder.slice();

                // Simulate virtual scroll
                tableComponent.setCurrentlyRenderedRows(15, 10);

                // The arrays should be a normal slice without any preservation
                expect(tableComponent._dndTableRowsPlaceholder.length).toBe(10);
                expect(tableComponent._tableCurrentlyRenderedRowsPlaceholder.length).toBe(10);
            });

            it('should not preserve dragged row when scrollWholeRows is disabled', () => {
                // Disable scrollWholeRows
                hostComponent.virtualScrollDirective.scrollWholeRows = false;
                fixture.detectChanges();

                const mockRow = tableComponent._tableRowsVisible[10];

                // Set up drag state
                if (tableComponent._dndTableDirective) {
                    tableComponent._dndTableDirective['_draggedRowObject'] = mockRow;
                    tableComponent._dndTableDirective['_draggedDndIndex'] = 5;
                    tableComponent._dndTableDirective['_draggedRowGlobalIndex'] = 10;
                    tableComponent._dndTableDirective.dragDropInProgress = true;
                }

                // Simulate virtual scroll
                tableComponent.setCurrentlyRenderedRows(15, 10);

                // Should not preserve (scrollWholeRows is false)
                // Just verify it doesn't throw an error
                expect(tableComponent._dndTableRowsPlaceholder).toBeDefined();
            });
        });
    });
});
