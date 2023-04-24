import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchInput } from '../../interfaces/search-field.interface';
import { PlatformTableModule } from '../../table.module';
import { Table } from '../../table';
import { TableToolbarComponent } from './table-toolbar.component';
import { TableService } from '../../table.service';
import { Subject } from 'rxjs';

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
            const tableHandlerSpy = jest.spyOn(table, 'search').mockImplementation();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            const searchInput: SearchInput = { text: '', category: null };

            component.submitSearch(searchInput);

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
            expect(tableHandlerSpy).toHaveBeenCalledWith(searchInput);
        });

        it('Should trigger table.openTableSortSettings by "openSorting"', () => {
            const tableHandlerSpy = jest.spyOn(table.openTableSortSettings, 'emit').mockImplementation();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openSorting();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should trigger table.openFilteringDialog by "openFiltering"', () => {
            const tableHandlerSpy = jest.spyOn(table.openTableFilterSettings, 'emit').mockImplementation();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openFiltering();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should trigger table.openGroupingDialog by "openGrouping"', () => {
            const tableHandlerSpy = jest.spyOn(table.openTableGroupSettings, 'emit').mockImplementation();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openGrouping();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should trigger table.openTableColumnSettings by "openColumns"', () => {
            const tableHandlerSpy = jest.spyOn(table.openTableColumnSettings, 'emit').mockImplementation();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openColumns();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should call table.expandAll by "_expandAll" action ', () => {
            const tableHandlerSpy = jest.spyOn(table, 'expandAll').mockImplementation();

            component._expandAll();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should call table.collapseAll by "_collapseAll" action ', () => {
            const tableHandlerSpy = jest.spyOn(table, 'collapseAll').mockImplementation();

            component._collapseAll();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });
    });
});
