import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PlatformListModule } from '@fundamental-ngx/platform/list';
import { TableColumn } from '../table-column/table-column';

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

@Component({
    template: `
        <fdp-table-cell-header-popover
            [column]="column"
            [popoverTemplate]="popoverTemplate"
            [columnFrozen]="false"
            [filteringFromHeaderDisabled]="false"
        ></fdp-table-cell-header-popover>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
    column: TableColumn = new MockTableColumn() as TableColumn;
    popoverTemplate: Nullable<TemplateRef<any>>;
    disabled = false;
    columnFrozen = false;
    filteringFromHeaderDisabled = false;

    @ViewChild(TableCellHeaderPopoverComponent)
    popoverComponent: TableCellHeaderPopoverComponent;
}

describe('TableCellHeaderPopoverComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent, TableCellHeaderPopoverComponent],
            imports: [PopoverModule, PlatformListModule, TemplateDirective]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render items based on conditions', fakeAsync(() => {
        tick(1000);

        const renderedPopoverItems = component.popoverComponent._popoverItems.toArray().map((item) => item.name);

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
});
