import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import {
    CollectionFilter,
    CollectionGroup,
    CollectionSort,
    SortDirection,
    TableDataSource
} from '@fundamental-ngx/platform/table-helpers';
import { TableComponent } from '../table.component';
import { PlatformTableModule } from '../table.module';
import { SourceItem, TableDataProviderMock } from './helpers';
@Component({
    template: `
        <fdp-table
            [dataSource]="source"
            fdCompact
            [initialSortBy]="initialSortBy"
            [initialFilterBy]="initialFilterBy"
            [initialGroupBy]="initialGroupBy"
            [initialVisibleColumns]="initialColumns"
        >
            <fdp-column name="name" key="name" label="Name"></fdp-column>
            <fdp-column name="description" key="description" label="Description"></fdp-column>
            <fdp-column name="status" key="status" label="Status"></fdp-column>
        </fdp-table>
    `,
    standalone: true,
    imports: [PlatformTableModule, RouterModule, RouterTestingModule],
})
class TableHostComponent {
    @ViewChild(TableComponent) table: TableComponent;

    initialSortBy: CollectionSort[] = [{ field: 'name', direction: SortDirection.ASC }];
    initialFilterBy: CollectionFilter[] = [
        { field: 'name', value: 'Product 5', strategy: 'beginsWith', exclude: false }
    ];
    initialGroupBy: CollectionGroup[] = [{ field: 'status', direction: SortDirection.NONE, showAsColumn: true }];
    initialColumns: string[] = ['name', 'status'];

    source = new TableDataSource(new TableDataProviderMock());
}

describe('TableComponent Initial State', () => {
    let hostComponent: TableHostComponent;
    let fixture: ComponentFixture<TableHostComponent>;
    let tableComponent: TableComponent<SourceItem>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TableHostComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableHostComponent);
        hostComponent = fixture.componentInstance;
        jest.spyOn(hostComponent.source, 'fetch');

        fixture.detectChanges();

        tableComponent = hostComponent.table;
    });

    it('should apply initialSortBy option to table state', () => {
        expect(tableComponent.getTableState().sortBy).toEqual(hostComponent.initialSortBy);
    });

    it('should apply initialFilterBy option to table state', () => {
        expect(tableComponent.getTableState().filterBy).toEqual(hostComponent.initialFilterBy);
    });

    it('should apply initialGroupBy option to table state', () => {
        expect(tableComponent.getTableState().groupBy).toEqual(hostComponent.initialGroupBy);
    });

    it('should apply initialVisibleColumns option to table state', () => {
        expect(tableComponent.getTableState().columns).toEqual(hostComponent.initialColumns);
    });

    it('should apply initial options to table state and pass it to data source', () => {
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);
        expect(hostComponent.source.fetch).toHaveBeenCalledWith(tableComponent.getTableState());
    });
});
