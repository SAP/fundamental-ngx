import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TableComponent } from '../table.component';
import { SelectionMode, TableDataSource, TableRowType, TableService } from '@fundamental-ngx/platform/table-helpers';
import { PlatformTableModule } from '../table.module';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { TableDataProviderMock } from './helpers';

describe('TableComponent internal', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let tableService: TableService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;

        component._dataSourceDirective.dataSource = new TableDataSource(new TableDataProviderMock());
        tableService = (<any>component)._tableService;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select two rows one by one', () => {
        component.selectionMode = SelectionMode.MULTIPLE;
        component.ngAfterViewInit();

        const emitChangeSpy = jest.spyOn(component.rowSelectionChange, 'emit');

        component._toggleMultiSelectRow(component._tableRows[0]);

        expect(emitChangeSpy).toHaveBeenCalled();

        component._toggleMultiSelectRow(component._tableRows[1]);

        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._tableRows.filter((r) => r.checked).length).toEqual(2);
    });

    it('should select single row', () => {
        component.selectionMode = SelectionMode.SINGLE;
        component.ngAfterViewInit();

        const emitChangeSpy = jest.spyOn(component.rowSelectionChange, 'emit');

        component._toggleSingleSelectableRow(component._tableRows[0]);

        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._tableRows.filter((r) => r.checked).length).toEqual(1);

        component._toggleSingleSelectableRow(component._tableRows[1]);

        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._tableRows.filter((r) => r.checked).length).toEqual(1);
    });

    it('should unselect row on the second selection call', () => {
        component.selectionMode = SelectionMode.SINGLE;
        component.ngAfterViewInit();

        component._toggleSingleSelectableRow(component._tableRows[0]);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(1);

        component._toggleSingleSelectableRow(component._tableRows[0]);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(0);
    });

    it('should select all rows and unselect on the second call', () => {
        component.selectionMode = SelectionMode.MULTIPLE;
        component.ngAfterViewInit();

        component._toggleAllSelectableRows(true);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(
            component._tableRows.filter(({ type }) => type === TableRowType.ITEM).length
        );

        component._toggleAllSelectableRows(false);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(0);
    });

    it('freezeTo method should call TableService.freezeTo and set freezable info', async () => {
        const columnKey = 'description';
        const serviceFreezeToSpy = jest.spyOn(tableService, 'freezeTo');

        component.freezeToColumn(columnKey);

        expect(serviceFreezeToSpy).toHaveBeenCalledWith(columnKey, undefined);
        expect(component.freezeColumnsTo).toEqual(columnKey);
    });
});
