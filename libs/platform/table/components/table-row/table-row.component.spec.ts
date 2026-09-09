import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import {
    SelectionMode,
    TableColumn,
    TableColumnResizeService,
    TableRow,
    TableRowService,
    TableService
} from '@fundamental-ngx/platform/table-helpers';
import { TableRowComponent } from './table-row.component';

describe('TableRowComponent', () => {
    let component: TableRowComponent<TestData>;
    let fixture: ComponentFixture<TestTableRowWrapperComponent>;

    interface TestData {
        name: string;
        description: string;
    }

    @Component({
        template: `
            <table>
                <tbody>
                    <tr fdp-table-row [row]="row" [rowId]="'test-row'" [index]="0" [selectionMode]="selectionMode"></tr>
                </tbody>
            </table>
        `,
        imports: [TableRowComponent]
    })
    class TestTableRowWrapperComponent {
        row: TableRow<TestData> = {
            value: { name: 'Test', description: 'Test description' },
            checked: false,
            state: 'readonly',
            index: 0
        } as TableRow<TestData>;
        selectionMode = SelectionMode.NONE;
    }

    beforeEach(async () => {
        const mockColumns: TableColumn[] = [
            {
                name: 'name',
                key: 'name',
                label: 'Name',
                applyText: true,
                noWrap: false
            },
            {
                name: 'description',
                key: 'description',
                label: 'Description',
                applyText: true,
                noWrap: false
            }
        ];

        const mockTableService = {
            visibleColumns$: signal(mockColumns),
            visibleColumnsLength: jest.fn(() => mockColumns.length),
            _semanticHighlighting$: signal(null),
            _semanticHighlightingColumnWidth$: signal('0px'),
            _isShownNavigationColumn$: signal(false)
        };

        const mockTableRowService = {
            cellFocused: jest.fn(),
            cellClicked: jest.fn(),
            cellActivate: jest.fn(),
            toggleRow: jest.fn(),
            loadChildRows: jest.fn(),
            updateEditableCells: jest.fn(),
            removeEditableCells: jest.fn(),
            scrollToOverlappedCell: jest.fn()
        };

        const mockTableColumnResizeService = {
            resizeInProgress$: signal(false),
            markForCheck: signal(undefined),
            cellMockVisible$: signal(false),
            getPrevColumnsWidth: jest.fn(() => 0),
            getColumnWidthStyle: jest.fn(() => 'auto'),
            getNextColumnsWidth: jest.fn(() => 0)
        };

        const mockContentDensityObserver = {
            contentDensity$: signal('cozy' as const)
        };

        await TestBed.configureTestingModule({
            imports: [TestTableRowWrapperComponent],
            providers: [
                { provide: TableService, useValue: mockTableService },
                { provide: TableRowService, useValue: mockTableRowService },
                { provide: TableColumnResizeService, useValue: mockTableColumnResizeService },
                { provide: ContentDensityObserver, useValue: mockContentDensityObserver }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestTableRowWrapperComponent);
        const tableRowElement = fixture.nativeElement.querySelector('[fdp-table-row]');
        component = fixture.debugElement.query((el) => el.nativeElement === tableRowElement).componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('cell title attribute', () => {
        it('should call _getCellTitle for title binding', () => {
            const spy = jest.spyOn(component, '_getCellTitle');
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
        });

        it('should return null when cell content does not overflow', () => {
            // Mock a cell that doesn't overflow
            const cellTextContainer = fixture.nativeElement.querySelector('.fd-table__text');
            if (cellTextContainer) {
                Object.defineProperty(cellTextContainer, 'offsetWidth', { value: 200, configurable: true });
                Object.defineProperty(cellTextContainer, 'scrollWidth', { value: 150, configurable: true });
            }

            // Trigger update
            component['_updateCellTitles']();
            fixture.detectChanges();

            const title = component._getCellTitle(0);
            expect(title).toBeNull();
        });

        it('should return text content when cell content overflows', () => {
            const cellTextContainer = fixture.nativeElement.querySelector('.fd-table__text');
            if (cellTextContainer) {
                // Mock overflow scenario
                Object.defineProperty(cellTextContainer, 'offsetWidth', { value: 100, configurable: true });
                Object.defineProperty(cellTextContainer, 'scrollWidth', { value: 200, configurable: true });
                Object.defineProperty(cellTextContainer, 'textContent', {
                    value: 'Very long text that overflows',
                    configurable: true
                });
            }

            // Trigger update
            component['_updateCellTitles']();
            fixture.detectChanges();

            const title = component._getCellTitle(0);
            expect(title).toBe('Very long text that overflows');
        });

        it('should update cell titles after render', (done) => {
            const spy = jest.spyOn<any>(component, '_updateCellTitles');

            // Wait for afterNextRender to execute
            setTimeout(() => {
                expect(spy).toHaveBeenCalled();
                done();
            }, 50);
        });

        it('should not trigger layout reads during change detection', () => {
            // This test verifies that _getCellTitle reads from cache, not from DOM
            const cellTextContainer = fixture.nativeElement.querySelector('.fd-table__text');

            // Set up initial state
            if (cellTextContainer) {
                Object.defineProperty(cellTextContainer, 'offsetWidth', { value: 100, configurable: true });
                Object.defineProperty(cellTextContainer, 'scrollWidth', { value: 200, configurable: true });
                Object.defineProperty(cellTextContainer, 'textContent', {
                    value: 'Cached text',
                    configurable: true
                });
            }

            component['_updateCellTitles']();
            fixture.detectChanges();

            // Now change DOM properties (simulating layout change)
            if (cellTextContainer) {
                Object.defineProperty(cellTextContainer, 'textContent', {
                    value: 'New text',
                    configurable: true
                });
            }

            // _getCellTitle should return cached value, not new DOM value
            const title = component._getCellTitle(0);
            expect(title).toBe('Cached text');
        });
    });
});
