import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { TableP13DialogComponent } from './table-p13-dialog.component';
import { PlatformTableModule } from '../../table.module';
import { TableComponent } from '../../table.component';
import { TableColumnResizeService } from '../../table-column-resize.service';
import { TableColumnComponent } from '../table-column/table-column.component';
import { TableColumnResizeServiceMock } from '../../mocks/table-column-resize-mock.service';

const generateColumn = (label: string, disableP13n: boolean): TableColumnComponent => {
    const columnFixture = TestBed.createComponent(TableColumnComponent);
    const columnInstance = columnFixture.componentInstance;
    columnInstance.name = label;
    columnInstance.disableP13n = disableP13n;
    return columnInstance;
};

describe('TableP13DialogComponent', () => {
    let tableComponent: TableComponent;
    let tableFixture: ComponentFixture<TableComponent>;

    let component: TableP13DialogComponent;
    let fixture: ComponentFixture<TableP13DialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, DialogModule],
            declarations: [TableP13DialogComponent],
            providers: [DialogService, { provide: TableColumnResizeService, useClass: TableColumnResizeServiceMock }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableP13DialogComponent);
        component = fixture.componentInstance;

        tableFixture = TestBed.createComponent(TableComponent);
        tableComponent = tableFixture.componentInstance;
        component.table = tableComponent;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should exclude columns from the list when disableP13=true is used', () => {
        spyOn(tableComponent, 'getTableColumns').and.returnValue([
            generateColumn('Name', false),
            generateColumn('Actions', true)
        ]);
        fixture.detectChanges();

        const p13Columns = (component as any)._getTableColumns() || [];
        expect(p13Columns.length).toBe(1);
    });

    it('should include all the table column by default', () => {
        spyOn(tableComponent, 'getTableColumns').and.returnValue([
            generateColumn('Name', false),
            generateColumn('Actions', false)
        ]);
        fixture.detectChanges();

        const p13Columns = (component as any)._getTableColumns() || [];
        expect(p13Columns.length).toBe(2);
    });
});
