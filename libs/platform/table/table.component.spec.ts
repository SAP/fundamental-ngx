import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Table, TableDataSource } from '@fundamental-ngx/platform/table-helpers';

import { TableComponent } from './table.component';
import { TableDataProviderMock } from './tests/helpers';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: Table, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        component._dataSourceDirective.dataSource = new TableDataSource(new TableDataProviderMock());

        fixture.detectChanges();
    });

    it('should create sucessfully', () => {
        expect(component).toBeTruthy();
    });

    describe('isBodyHeightValid', () => {
        it('should return true when valid body height is passed in pixels', () => {
            component.bodyHeight = '30px';
            expect(component.isBodyHeightValid).toBeTruthy();
        });

        it('should return false when invalid body height is passed in pixels', () => {
            component.bodyHeight = 'thirtypx';
            expect(component.isBodyHeightValid).toBeFalsy();
        });

        it('should return false when invalid body height is passed(without units)', () => {
            component.bodyHeight = '100';
            expect(component.isBodyHeightValid).toBeFalsy();
        });

        it('should return true when valid body height is passed in percentage', () => {
            component.bodyHeight = '75%';
            expect(component.isBodyHeightValid).toBeTruthy();
        });

        it('should return false when invalid body height is passed in pixels', () => {
            component.bodyHeight = 'seventyfive%';
            expect(component.isBodyHeightValid).toBeFalsy();
        });

        it('should return false when invalid body height(undefined)', () => {
            component.bodyHeight = 'seventyfive%';
            expect(component.isBodyHeightValid).toBeFalsy();
        });
    });

    describe('tableBodyHeight', () => {
        it('should return body height of the table when its valid', () => {
            const mockBodyHeight = '750px';
            component.bodyHeight = mockBodyHeight;

            expect(component.tableBodyHeight).toEqual(mockBodyHeight);
        });

        it('should return default body height(100%) when its in-valid case 1(seventyFivepx)', () => {
            const mockBodyHeight = 'seventyFivepx';
            component.bodyHeight = mockBodyHeight;

            expect(component.tableBodyHeight).toEqual('100%');
        });

        it('should return default body height(100%) when its in-valid case 2(thirty%)', () => {
            const mockBodyHeight = 'thirty%';
            component.bodyHeight = mockBodyHeight;

            expect(component.tableBodyHeight).toEqual('100%');
        });

        it('should return default body height(100%) when its in-valid case 3(blank string)', () => {
            const mockBodyHeight = '';
            component.bodyHeight = mockBodyHeight;

            expect(component.tableBodyHeight).toEqual('100%');
        });

        it('should return default body height(100%) when its in-valid case 3(undefined)', () => {
            expect(component.tableBodyHeight).toEqual('100%');
        });
    });
});
