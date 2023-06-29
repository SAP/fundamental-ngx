import { Component, DebugElement, ViewChild } from '@angular/core';
import { TableComponent } from '../table.component';
import {
    ChildTableDataSource,
    SelectionMode,
    TableDataSource,
    TableDraggable,
    TableRowToggleOpenStateEvent
} from '@fundamental-ngx/platform/table-helpers';
import {
    SourceItem,
    TreeTableChildDataProviderMock,
    TreeTableRootDataProviderMock,
    treeItemParentsCount,
    treeItemsChildrenPerParentCount
} from './helpers';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlatformTableModule } from '../table.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { of } from 'rxjs';

@Component({
    template: `
        <fdp-table
            fdCompact
            selectionMode="multiple"
            [dataSource]="source"
            [isTreeTable]="true"
            [childDataSource]="childSource"
            hasChildrenKey="hasChildren"
            [relationKey]="relationKey"
        >
            <fdp-column name="name" key="name" label="Name"></fdp-column>
            <fdp-column name="description" key="description" label="Description"></fdp-column>
            <fdp-column name="status" key="status" label="Status"></fdp-column>
        </fdp-table>
    `
})
class TableHostComponent {
    @ViewChild(TableComponent) table: TableComponent;

    source = new TableDataSource(new TreeTableRootDataProviderMock());
    childSource = new ChildTableDataSource(new TreeTableChildDataProviderMock());
    relationKey = 'children';
}

describe('TableComponent Tree View with lazily loaded children', async () => {
    let hostComponent: TableHostComponent;
    let fixture: ComponentFixture<TableHostComponent>;
    let tableComponent: TableComponent<SourceItem>;
    let dndDirective: TableDraggable;

    let tableBodyRows: DebugElement[] = [];
    let tableRowTogglerCellsArray: DebugElement[] = [];

    let firstRowToggler: DebugElement;
    let secondRowToggler: DebugElement;

    const calculateTableElementsMetaData = (): void => {
        tableBodyRows = fixture.debugElement.queryAll(By.css('.fdp-table__body tbody .fd-table__row'));
        tableRowTogglerCellsArray = fixture.debugElement.queryAll(
            By.css('.fdp-table__body tbody .fd-table__row .fd-table__cell--expand')
        );
        firstRowToggler = tableRowTogglerCellsArray[0];
        secondRowToggler = tableRowTogglerCellsArray[1];
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, RouterModule, RouterTestingModule],
            declarations: [TableHostComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableHostComponent);
        hostComponent = fixture.componentInstance;
        spyOn(hostComponent.source, 'fetch').and.callThrough();

        fixture.detectChanges();

        tableComponent = hostComponent.table;
        dndDirective = tableComponent._dndTableDirective!;
    });

    beforeEach(() => {
        calculateTableElementsMetaData();
    });

    it('should generate rows for provided items', () => {
        expect(tableComponent._tableRows.length).toEqual(treeItemParentsCount);

        expect(tableRowTogglerCellsArray.length).toEqual(treeItemParentsCount);
    });

    describe('Collapsing/Expanding', () => {
        beforeEach(() => {
            calculateTableElementsMetaData();
        });

        it('should emit event when parent item collapsed/expanded', () => {
            const emitSpy = spyOn(tableComponent.rowToggleOpenState, 'emit').and.callThrough();

            firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            const event1 = new TableRowToggleOpenStateEvent<SourceItem>(
                0,
                tableComponent._tableRowsVisible[0].value,
                true
            );

            expect(emitSpy).toHaveBeenCalledWith(event1);

            calculateTableElementsMetaData();

            secondRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            const secondRowIndex = 1 + treeItemsChildrenPerParentCount;
            const event2 = new TableRowToggleOpenStateEvent<SourceItem>(
                secondRowIndex,
                tableComponent._tableRowsVisible[secondRowIndex].value,
                true
            );

            expect(emitSpy).toHaveBeenCalledTimes(2);
            expect(emitSpy.calls.argsFor(1)).toEqual([event2]);
        });

        it('should react to toggling/collapsing with changing rows count', async () => {
            firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            fixture.detectChanges();

            await fixture.whenStable();

            calculateTableElementsMetaData();

            expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount);

            secondRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            fixture.detectChanges();

            await fixture.whenStable();

            calculateTableElementsMetaData();

            expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount * 2);

            firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            fixture.detectChanges();

            await fixture.whenStable();

            calculateTableElementsMetaData();

            expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount);

            secondRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            fixture.detectChanges();

            await fixture.whenStable();

            calculateTableElementsMetaData();

            expect(tableBodyRows.length).toEqual(treeItemParentsCount);
        });
    });

    describe('Drag & Drop', () => {
        beforeEach(() => {
            calculateTableElementsMetaData();

            firstRowToggler = tableRowTogglerCellsArray[0];
        });

        it('should rearrange table rows on drop', () => {
            firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 0,
                draggedItemIndex: 1,
                mode: 'group',
                insertAt: 'after'
            });

            fixture.detectChanges();

            calculateTableElementsMetaData();

            expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount * 1);
        });

        it('should emit event after rearranging rows', async () => {
            const emitSpy = spyOn(dndDirective.rowsRearrange, 'emit').and.callThrough();

            firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 0,
                draggedItemIndex: 1,
                mode: 'group',
                insertAt: 'after'
            });

            fixture.detectChanges();
            await fixture.whenStable();

            expect(emitSpy).toHaveBeenCalled();
        });

        it('should update dragged rows attributes', async () => {
            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 0,
                draggedItemIndex: 1,
                mode: 'group',
                insertAt: 'after'
            });

            spyOn(hostComponent.childSource.dataProvider, 'rowChildrenCount').and.callFake(() => of(2));

            fixture.detectChanges();
            await fixture.whenStable();

            tableComponent._tableRows[1].expanded = true;

            fixture.detectChanges();
            await fixture.whenStable();

            calculateTableElementsMetaData();

            await Promise.resolve();

            expect(tableComponent._tableRows[0].expanded).toBeTrue();
            expect(tableComponent._tableRows[1].level).toEqual(1);
            expect(tableComponent._tableRows[2].level).toEqual(1);
        });

        it('should prevent from dropping row inside itself', async () => {
            firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            fixture.detectChanges();

            calculateTableElementsMetaData();

            expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount * 1);

            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 1,
                draggedItemIndex: 0,
                mode: 'group',
                insertAt: 'after'
            });

            fixture.detectChanges();
            await fixture.whenStable();

            calculateTableElementsMetaData();

            expect(tableComponent._tableRowsVisible[0].level).toEqual(0);
        });

        it('should change type for row with 0 children to "item"', async () => {
            expect(tableRowTogglerCellsArray.length).toEqual(treeItemParentsCount);

            firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

            fixture.detectChanges();

            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 2,
                draggedItemIndex: 1,
                mode: 'group',
                insertAt: 'after'
            });

            fixture.detectChanges();
            await fixture.whenStable();

            calculateTableElementsMetaData();

            expect(tableRowTogglerCellsArray.length).toEqual(treeItemParentsCount - 1);
        });

        it('should have correct order of items before and after drag and drop', async () => {
            const row1 = tableComponent._tableRowsVisible[0];
            const draggedRow = tableComponent._tableRowsVisible[1];
            const row3 = tableComponent._tableRowsVisible[2];

            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 2,
                draggedItemIndex: 1,
                mode: 'group',
                insertAt: 'after'
            });

            fixture.detectChanges();
            await fixture.whenStable();

            expect(row1).toEqual(tableComponent._tableRowsVisible[0]);
            expect(draggedRow).toEqual(tableComponent._tableRowsVisible[2]);
            expect(row3).toEqual(tableComponent._tableRowsVisible[1]);
        });

        it('should correctly drag and drop first element to last element', async () => {
            const draggedRow = tableComponent._tableRowsVisible[0];

            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 9,
                draggedItemIndex: 0,
                mode: 'group',
                insertAt: 'after'
            });

            fixture.detectChanges();
            await fixture.whenStable();

            expect(draggedRow).toEqual(tableComponent._tableRowsVisible[9]);
        });

        it('should correctly drag and drop last element to first element', async () => {
            const draggedRow = tableComponent._tableRowsVisible[9];

            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 0,
                draggedItemIndex: 9,
                mode: 'group',
                insertAt: 'after'
            });

            fixture.detectChanges();
            await fixture.whenStable();

            expect(draggedRow).toEqual(tableComponent._tableRowsVisible[1]);
        });

        it('should correctly drag and drop first element to in-between', async () => {
            const draggedRow = tableComponent._tableRowsVisible[0];

            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 5,
                draggedItemIndex: 0,
                mode: 'group',
                insertAt: 'after'
            });

            fixture.detectChanges();
            await fixture.whenStable();

            expect(draggedRow).toEqual(tableComponent._tableRowsVisible[5]);
        });

        it('should correctly drag and drop last element to in-between', async () => {
            const draggedRow = tableComponent._tableRowsVisible[9];

            dndDirective.dragDropItemDrop({
                items: [],
                replacedItemIndex: 5,
                draggedItemIndex: 9,
                mode: 'group',
                insertAt: 'after'
            });

            fixture.detectChanges();
            await fixture.whenStable();

            expect(draggedRow.parent).toEqual(tableComponent._tableRowsVisible[5]);
        });
    });

    describe('Tree Selection', () => {
        beforeEach(async () => {
            fixture.detectChanges();
            await fixture.whenStable();
            calculateTableElementsMetaData();

            (hostComponent.childSource.dataProvider as any).childItemsCount = 2;
        });

        it('should select only one row', () => {
            hostComponent.table.selectionMode = SelectionMode.MULTIPLE;
            // hostComponent.table.ngAfterViewInit();

            const emitChangeSpy = spyOn(hostComponent.table.rowSelectionChange, 'emit').and.stub();

            hostComponent.table._toggleMultiSelectRow(hostComponent.table._tableRows[0]);

            expect(emitChangeSpy).toHaveBeenCalled();
        });

        it('should select only parent row and not children', async () => {
            hostComponent.table.selectionMode = SelectionMode.MULTIPLE;
            // hostComponent.table.ngAfterViewInit();

            hostComponent.table._tableRows[0].expanded = true;

            fixture.detectChanges();
            await fixture.whenStable();

            const emitChangeSpy = spyOn(hostComponent.table.rowSelectionChange, 'emit').and.stub();

            hostComponent.table._toggleMultiSelectRow(hostComponent.table._tableRows[0]);

            let selected: boolean | null = false;
            hostComponent.table._tableRows[0].children.forEach((c) => {
                selected = selected || c.checked;
            });

            expect(emitChangeSpy).toHaveBeenCalled();
            expect(selected).toBeFalse();
            expect(hostComponent.table._tableRows.filter((r) => r.checked).length).toEqual(1);
        });

        it('should select only child row and not parent row', async () => {
            const rows = hostComponent.table._tableRows;

            hostComponent.table.selectionMode = SelectionMode.MULTIPLE;
            rows[0].expanded = true;

            fixture.detectChanges();
            await fixture.whenStable();

            const emitChangeSpy = spyOn(hostComponent.table.rowSelectionChange, 'emit').and.stub();

            hostComponent.table._toggleMultiSelectRow(rows[0].children[0]);

            expect(emitChangeSpy).toHaveBeenCalled();
            expect(rows.filter((r) => r.checked).length).toEqual(1);
            expect(rows[0].checked).toBeFalse();
        });

        describe('with Tristate mode enabled', () => {
            beforeEach(() => {
                calculateTableElementsMetaData();
            });

            it('should select parent row and all children', async () => {
                hostComponent.table.enableTristateMode = true;
                hostComponent.table.selectionMode = SelectionMode.MULTIPLE;
                // hostComponent.table.ngAfterViewInit();

                hostComponent.table._tableRows[0].expanded = true;
                fixture.detectChanges();
                await fixture.whenStable();

                const emitChangeSpy = spyOn(hostComponent.table.rowSelectionChange, 'emit').and.stub();

                hostComponent.table._toggleMultiSelectRow(hostComponent.table._tableRows[0]);

                let selected: boolean | null = false;
                hostComponent.table._tableRows[0].children.forEach((c) => {
                    selected = selected || c.checked;
                });

                expect(emitChangeSpy).toHaveBeenCalled();
                expect(selected).toBeTrue();
                expect(hostComponent.table._tableRows.filter((r) => r.checked).length).toEqual(3);
            });

            it('should select a child row and parent row using triste', async () => {
                hostComponent.table.enableTristateMode = true;
                hostComponent.table.selectionMode = SelectionMode.MULTIPLE;
                // hostComponent.table.ngAfterViewInit();

                hostComponent.table._tableRows[0].expanded = true;
                fixture.detectChanges();
                await fixture.whenStable();

                const emitChangeSpy = spyOn(hostComponent.table.rowSelectionChange, 'emit').and.stub();
                hostComponent.table._toggleMultiSelectRow(hostComponent.table._tableRows[0].children[0]);

                expect(emitChangeSpy).toHaveBeenCalled();
                expect(hostComponent.table._tableRows.filter((r) => r.checked || r.checked === null).length).toEqual(2);
                expect(hostComponent.table._tableRows[0].checked).toBeNull();
            });

            it('should select a two child row and parent with checked state', async () => {
                hostComponent.table.enableTristateMode = true;
                hostComponent.table.selectionMode = SelectionMode.MULTIPLE;

                hostComponent.table._tableRows[0].expanded = true;
                fixture.detectChanges();
                await fixture.whenStable();

                // hostComponent.table.ngAfterViewInit();

                const emitChangeSpy = spyOn(hostComponent.table.rowSelectionChange, 'emit').and.stub();
                hostComponent.table._toggleMultiSelectRow(hostComponent.table._tableRows[0].children[0]);
                expect(emitChangeSpy).toHaveBeenCalled();

                hostComponent.table._toggleMultiSelectRow(hostComponent.table._tableRows[0].children[1]);
                expect(emitChangeSpy).toHaveBeenCalled();

                expect(hostComponent.table._tableRows.filter((r) => r.checked || r.checked === null).length).toEqual(3);
                expect(hostComponent.table._tableRows[0].checked).toBeTrue();
            });
        });
    });
});
