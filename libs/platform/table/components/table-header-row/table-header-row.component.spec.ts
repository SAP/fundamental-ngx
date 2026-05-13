import { Component, computed, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import { TableService as CoreTableService } from '@fundamental-ngx/core/table';
import { FD_LANGUAGE, FD_LANGUAGE_SIGNAL, FdLanguage } from '@fundamental-ngx/i18n';
import {
    SelectionMode,
    TableColumnResizeService,
    TableRowService,
    TableService
} from '@fundamental-ngx/platform/table-helpers';
import { TableHeaderRowComponent } from './table-header-row.component';

describe('TableHeaderRowComponent', () => {
    let component: TableHeaderRowComponent;
    let fixture: ComponentFixture<TestTableHeaderRowComponent>;
    let selectionCellElement: HTMLElement;

    @Component({
        template: `
            <table>
                <thead>
                    <tr
                        fdp-table-header-row
                        [isShownSelectionColumn]="true"
                        [selectionMode]="selectionMode"
                        [checkedState]="false"
                    ></tr>
                </thead>
            </table>
        `,
        imports: [TableHeaderRowComponent]
    })
    class TestTableHeaderRowComponent {
        selectionMode = SelectionMode.MULTIPLE;
    }

    beforeEach(async () => {
        const mockTableService = {
            visibleColumns$: signal([]),
            visibleColumnsLength: computed(() => 0),
            _semanticHighlighting$: signal(false),
            _semanticHighlightingColumnWidth$: signal('0px'),
            _isShownNavigationColumn$: signal(false),
            _isFilteringFromHeaderDisabled$: signal(false),
            sortRules$: signal(new Map())
        };

        const mockTableRowService = {
            cellFocused: jest.fn(),
            toggleAllSelectableRows: jest.fn(),
            scrollToOverlappedCell: jest.fn()
        };

        const mockTableColumnResizeService = {
            markForCheck: {
                pipe: jest.fn().mockReturnValue({
                    subscribe: jest.fn()
                })
            },
            cellMockVisible$: signal(false),
            getPrevColumnsWidth: jest.fn().mockReturnValue(0),
            getColumnWidthStyle: jest.fn().mockReturnValue('auto'),
            getNextColumnsWidth: jest.fn().mockReturnValue(0)
        };

        const mockContentDensityObserver = {
            contentDensity$: signal('cozy')
        };

        await TestBed.configureTestingModule({
            imports: [TestTableHeaderRowComponent],
            providers: [
                { provide: TableService, useValue: mockTableService },
                {
                    provide: CoreTableService,
                    useValue: {
                        propagateKeys$: signal(0)
                    }
                },
                { provide: TableRowService, useValue: mockTableRowService },
                { provide: TableColumnResizeService, useValue: mockTableColumnResizeService },
                { provide: ContentDensityObserver, useValue: mockContentDensityObserver },
                {
                    provide: FD_LANGUAGE,
                    useValue: signal<FdLanguage>({
                        platformTable: {
                            selectAllCheckboxLabel: 'Select All',
                            deselectAllCheckboxLabel: 'Deselect All',
                            selectAllCheckboxLongLabel: 'Select all items',
                            deselectAllCheckboxLongLabel: 'Deselect all items',
                            selectAllCheckboxMixedLongLabel: 'Select all mixed items'
                        }
                    } as FdLanguage)
                },
                {
                    provide: FD_LANGUAGE_SIGNAL,
                    useValue: signal<FdLanguage>({
                        platformTable: {
                            selectAllCheckboxLabel: 'Select All',
                            deselectAllCheckboxLabel: 'Deselect All',
                            selectAllCheckboxLongLabel: 'Select all items',
                            deselectAllCheckboxLongLabel: 'Deselect all items',
                            selectAllCheckboxMixedLongLabel: 'Select all mixed items'
                        }
                    } as FdLanguage)
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestTableHeaderRowComponent);
        fixture.detectChanges();

        const debugElement = fixture.debugElement.query(
            (el) => el.componentInstance instanceof TableHeaderRowComponent
        );
        if (!debugElement) {
            throw new Error('TableHeaderRowComponent not found in fixture');
        }
        component = debugElement.componentInstance;
        selectionCellElement = fixture.nativeElement.querySelector('.fd-table__cell--checkbox') as HTMLElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('selectionColumnHeaderDisableTitle signal', () => {
        it('should initialize to true', () => {
            expect(component.selectionColumnHeaderDisableTitle()).toBe(true);
        });

        it('should set to false on mouseenter', () => {
            selectionCellElement.dispatchEvent(new MouseEvent('mouseenter'));
            fixture.detectChanges();

            expect(component.selectionColumnHeaderDisableTitle()).toBe(false);
        });

        it('should set to true on mouseleave', () => {
            // First set to false
            component.selectionColumnHeaderDisableTitle.set(false);
            fixture.detectChanges();

            selectionCellElement.dispatchEvent(new MouseEvent('mouseleave'));
            fixture.detectChanges();

            expect(component.selectionColumnHeaderDisableTitle()).toBe(true);
        });

        it('should set to false on focusin', () => {
            selectionCellElement.dispatchEvent(new FocusEvent('focusin'));
            fixture.detectChanges();

            expect(component.selectionColumnHeaderDisableTitle()).toBe(false);
        });

        it('should set to true on focusout', () => {
            // First set to false
            component.selectionColumnHeaderDisableTitle.set(false);
            fixture.detectChanges();

            selectionCellElement.dispatchEvent(new FocusEvent('focusout'));
            fixture.detectChanges();

            expect(component.selectionColumnHeaderDisableTitle()).toBe(true);
        });

        it('should show title when signal is false', () => {
            component.selectionColumnHeaderDisableTitle.set(false);
            fixture.detectChanges();

            const title = selectionCellElement.getAttribute('title');
            expect(title).toBe('Select All');
        });

        it('should hide title when signal is true', () => {
            component.selectionColumnHeaderDisableTitle.set(true);
            fixture.detectChanges();

            const title = selectionCellElement.getAttribute('title');
            expect(title).toBeNull();
        });

        it('should hide title in single selection mode regardless of signal value', () => {
            fixture.componentInstance.selectionMode = SelectionMode.SINGLE;
            component.selectionColumnHeaderDisableTitle.set(false);
            fixture.detectChanges();

            const title = selectionCellElement.getAttribute('title');
            expect(title).toBeNull();
        });

        it('should toggle title on mouseenter and mouseleave sequence', () => {
            // Initial state: title hidden
            expect(selectionCellElement.getAttribute('title')).toBeNull();

            // Mouse enter: title shown
            selectionCellElement.dispatchEvent(new MouseEvent('mouseenter'));
            fixture.detectChanges();
            expect(selectionCellElement.getAttribute('title')).toBe('Select All');

            // Mouse leave: title hidden
            selectionCellElement.dispatchEvent(new MouseEvent('mouseleave'));
            fixture.detectChanges();
            expect(selectionCellElement.getAttribute('title')).toBeNull();
        });

        it('should toggle title on focusin and focusout sequence', () => {
            // Initial state: title hidden
            expect(selectionCellElement.getAttribute('title')).toBeNull();

            // Focus in: title shown
            selectionCellElement.dispatchEvent(new FocusEvent('focusin'));
            fixture.detectChanges();
            expect(selectionCellElement.getAttribute('title')).toBe('Select All');

            // Focus out: title hidden
            selectionCellElement.dispatchEvent(new FocusEvent('focusout'));
            fixture.detectChanges();
            expect(selectionCellElement.getAttribute('title')).toBeNull();
        });
    });
});
