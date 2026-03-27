import { EventEmitter } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { SearchInput } from '@fundamental-ngx/platform/search-field';

import { Table, TableService } from '@fundamental-ngx/platform/table-helpers';
import { Subject } from 'rxjs';
import { PlatformTableModule } from '../../table.module';
import { TableToolbarComponent } from './table-toolbar.component';

class TableComponentMock
    implements
        Pick<
            Table,
            | 'search'
            | 'openTableSortSettings'
            | 'openTableFilterSettings'
            | 'openTableGroupSettings'
            | 'openTableColumnSettings'
            | 'emptyRowAdded'
            | 'save'
            | 'cancel'
            | 'presetChanged'
            | 'expandAll'
            | 'collapseAll'
        >
{
    openTableSortSettings = new EventEmitter();
    openTableFilterSettings = new EventEmitter();
    openTableGroupSettings = new EventEmitter();
    openTableColumnSettings = new EventEmitter();
    emptyRowAdded = new EventEmitter();
    save = new EventEmitter();
    cancel = new EventEmitter();
    presetChanged = new EventEmitter();

    search(): void {}
    expandAll(): void {}
    collapseAll(): void {}
}

describe('TableToolbarComponent', () => {
    let component: TableToolbarComponent;
    let fixture: ComponentFixture<TableToolbarComponent>;
    let table: TableComponentMock;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule],
            providers: [
                {
                    provide: Table,
                    useFactory: () => {
                        table = new TableComponentMock();
                        return table;
                    }
                },
                {
                    provide: TableService,
                    useValue: {
                        tableLoading$: new Subject<void>()
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('delegates handling to table grid', () => {
        it('Should call table.search by "submitSearch"', () => {
            const tableHandlerSpy = jest.spyOn(table, 'search');

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            const searchInput: SearchInput = { text: '', category: null };

            component.submitSearch(searchInput);

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
            expect(tableHandlerSpy).toHaveBeenCalledWith(searchInput);
        });

        it('Should trigger table.openTableSortSettings by "openSorting"', () => {
            const tableHandlerSpy = jest.spyOn(table.openTableSortSettings, 'emit');

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openSorting();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should trigger table.openFilteringDialog by "openFiltering"', () => {
            const tableHandlerSpy = jest.spyOn(table.openTableFilterSettings, 'emit');

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openFiltering();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should trigger table.openGroupingDialog by "openGrouping"', () => {
            const tableHandlerSpy = jest.spyOn(table.openTableGroupSettings, 'emit');

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openGrouping();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should trigger table.openTableColumnSettings by "openColumns"', () => {
            const tableHandlerSpy = jest.spyOn(table.openTableColumnSettings, 'emit');

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openColumns();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should call table.expandAll by "_expandAll" action ', () => {
            const tableHandlerSpy = jest.spyOn(table, 'expandAll');

            component._expandAll();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should call table.collapseAll by "_collapseAll" action ', () => {
            const tableHandlerSpy = jest.spyOn(table, 'collapseAll');

            component._collapseAll();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('title text extraction for accessibility', () => {
        let titleElement: HTMLSpanElement;

        beforeEach(() => {
            titleElement = document.createElement('span');
            titleElement.id = component.tableToolbarTitleId;
            document.body.appendChild(titleElement);
        });

        afterEach(() => {
            if (document.body.contains(titleElement)) {
                document.body.removeChild(titleElement);
            }
        });

        it('should extract title text from DOM element when it exists', fakeAsync(() => {
            titleElement.textContent = 'Test Title (10)';

            // Trigger ngAfterViewChecked to set up the observer
            component.ngAfterViewChecked();
            tick();

            expect(component['titleText']()).toBe('Test Title (10)');
        }));

        it('should update title text when DOM content changes via MutationObserver', async () => {
            titleElement.textContent = 'Initial Title';

            // Trigger ngAfterViewChecked to set up the observer
            component.ngAfterViewChecked();

            expect(component['titleText']()).toBe('Initial Title');

            // Simulate content change
            titleElement.textContent = 'Updated Title (20)';

            // MutationObserver callback is async, wait for it
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(component['titleText']()).toBe('Updated Title (20)');
        });

        it('should disconnect observer on destroy', fakeAsync(() => {
            titleElement.textContent = 'Test Title';

            component.ngAfterViewChecked();
            tick();

            // Get reference to the observer
            const observer = component['_titleObserver'];
            expect(observer).toBeDefined();

            const disconnectSpy = jest.spyOn(observer!, 'disconnect');

            // Trigger destroy
            fixture.destroy();

            expect(disconnectSpy).toHaveBeenCalled();
        }));
    });
});
