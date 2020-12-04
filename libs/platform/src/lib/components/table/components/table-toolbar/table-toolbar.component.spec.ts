import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInput } from '../../../search-field/public_api';

import { TableComponent } from '../../table.component';

import { TableToolbarComponent } from './table-toolbar.component';

class TableComponentMock
    implements Pick<TableComponent, 'search' | 'openSortingDialog' | 'openFilteringDialog' | 'openGroupingDialog'> {
    search(): void {}
    openSortingDialog(): void {}
    openFilteringDialog(): void {}
    openGroupingDialog(): void {}
}

describe('TableToolbarComponent', () => {
    let component: TableToolbarComponent;
    let fixture: ComponentFixture<TableToolbarComponent>;
    let table: TableComponentMock;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TableToolbarComponent],
                providers: [
                    {
                        provide: TableComponent,
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

        it('Should call table.openSortingDialog by "openSorting"', () => {
            const tableHandlerSpy = spyOn(table, 'openSortingDialog').and.stub();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openSorting();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should call table.openFilteringDialog by "openSorting"', () => {
            const tableHandlerSpy = spyOn(table, 'openFilteringDialog').and.stub();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openFiltering();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });

        it('Should call table.openGroupingDialog by "openGrouping"', () => {
            const tableHandlerSpy = spyOn(table, 'openGroupingDialog').and.stub();

            expect(tableHandlerSpy).not.toHaveBeenCalled();

            component.openGrouping();

            expect(tableHandlerSpy).toHaveBeenCalledTimes(1);
        });
    });
});
