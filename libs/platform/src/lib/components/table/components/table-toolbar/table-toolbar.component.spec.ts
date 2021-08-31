import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlatformTableModule, SearchInput } from '@fundamental-ngx/platform';

import { Table } from '../../table';
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
        > {
    openTableSortSettings = new EventEmitter();
    openTableFilterSettings = new EventEmitter();
    openTableGroupSettings = new EventEmitter();
    openTableColumnSettings = new EventEmitter();

    search(): void {}
}

describe('TableToolbarComponent', () => {
    let component: TableToolbarComponent;
    let fixture: ComponentFixture<TableToolbarComponent>;
    let table: TableComponentMock;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PlatformTableModule],
                providers: [
                    {
                        provide: Table,
                        useFactory: () => {
                            table = new TableComponentMock();
                            return table;
                        }
                    }
                ]
            }).compileComponents();
        })
    );

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
            const tableHandlerSpy = spyOn(table, 'search').and.stub();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            const searchInput: SearchInput = { text: '', category: null };

            component.submitSearch(searchInput);

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
            expect(tableHandlerSpy).toHaveBeenCalledWith(searchInput);
        });

        it('Should trigger table.openTableSortSettings by "openSorting"', () => {
            const tableHandlerSpy = spyOn(table.openTableSortSettings, 'emit').and.stub();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openSorting();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should trigger table.openFilteringDialog by "openFiltering"', () => {
            const tableHandlerSpy = spyOn(table.openTableFilterSettings, 'emit').and.stub();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openFiltering();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should trigger table.openGroupingDialog by "openGrouping"', () => {
            const tableHandlerSpy = spyOn(table.openTableGroupSettings, 'emit').and.stub();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openGrouping();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should trigger table.openTableColumnSettings by "openColumns"', () => {
            const tableHandlerSpy = spyOn(table.openTableColumnSettings, 'emit').and.stub();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openColumns();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });
    });
});
