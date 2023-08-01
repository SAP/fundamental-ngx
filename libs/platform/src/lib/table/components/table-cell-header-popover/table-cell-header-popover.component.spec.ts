import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PlatformListModule } from '@fundamental-ngx/platform/list';
import {
    CollectionGroup,
    CollectionStringFilter,
    FILTER_STRING_STRATEGY,
    FilterableColumnDataType,
    SortDirection,
    TableColumn,
    TableService
} from '@fundamental-ngx/platform/table-helpers';

import { TableCellHeaderPopoverComponent } from './table-cell-header-popover.component';

const columnPopoverItemsMapping: { [key: string]: string | string[] } = {
    sortingAscPopoverItem: 'sortable',
    sortingDescPopoverItem: 'sortable',
    groupPopoverItem: 'groupable',
    freezePopoverItem: ['freezable', 'endFreezable'],
    filteringPopoverItem: 'filterable'
};

class MockTableColumn implements Partial<TableColumn> {
    sortable = true;
    key = 'key';
    groupable = true;
    freezable = true;
    endFreezable = false;
    name = 'name';
    filterable = true;
}

describe('TableCellHeaderPopoverComponent', () => {
    let component: TableCellHeaderPopoverComponent;
    let fixture: ComponentFixture<TableCellHeaderPopoverComponent>;
    let tableService: TableService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableCellHeaderPopoverComponent],
            imports: [PopoverModule, PlatformListModule, TemplateDirective],
            providers: [TableService]
        }).compileComponents();

        fixture = TestBed.createComponent(TableCellHeaderPopoverComponent);
        component = fixture.componentInstance;
        inject([TableService], (ts) => {
            tableService = ts;
        })();
        fixture.detectChanges();
        component.column = new MockTableColumn() as TableColumn;
        component.columnFrozen = false;
        component.filteringFromHeaderDisabled = false;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render items based on conditions', fakeAsync(async () => {
        component.column = new MockTableColumn() as TableColumn;
        component.columnFrozen = false;
        component.filteringFromHeaderDisabled = false;
        await fixture.detectChanges();
        tick(1000);

        const renderedPopoverItems = component._popoverItems.toArray().map((item) => item.name);

        Object.keys(columnPopoverItemsMapping).forEach((popoverItemName) => {
            const popoverItemConditionProperties = (
                Array.isArray(columnPopoverItemsMapping[popoverItemName])
                    ? columnPopoverItemsMapping[popoverItemName]
                    : [columnPopoverItemsMapping[popoverItemName]]
            ) as string[];

            const appliedCondition = popoverItemConditionProperties.reduce(
                (acc, current) => acc || component.column[current],
                false
            );

            expect(renderedPopoverItems.includes(popoverItemName)).toEqual(appliedCondition);
        });
    }));

    it('sort by cell header method should call TableService.setSort with a proper params', () => {
        const field = 'price.value';
        const direction = SortDirection.ASC;
        const serviceSortSpy = jest.spyOn(tableService, 'setSort');

        component._setColumnHeaderSortBy(field, direction);

        expect(serviceSortSpy).toHaveBeenCalledWith([{ field, direction }]);
    });

    it('filter by cell header method should call TableService.addFilters with a proper params', () => {
        const field = 'status';
        const value = 'valid';
        const payload: CollectionStringFilter = {
            field,
            value,
            type: FilterableColumnDataType.STRING,
            strategy: FILTER_STRING_STRATEGY.CONTAINS,
            exclude: false
        };
        const serviceFilterSpy = jest.spyOn(tableService, 'addFilters');

        component._setColumnHeaderFilterBy(field, value);

        expect(serviceFilterSpy).toHaveBeenCalledWith([payload]);
    });

    it('group by cell header method should call TableService.setGroups with a proper params', () => {
        const field = 'price.value';
        const payload: CollectionGroup[] = [{ field, direction: SortDirection.NONE, showAsColumn: true }];
        const serviceGroupSpy = jest.spyOn(tableService, 'setGroups');

        component._setColumnHeaderGroupBy(field);

        expect(serviceGroupSpy).toHaveBeenCalledWith(payload);
    });
});
