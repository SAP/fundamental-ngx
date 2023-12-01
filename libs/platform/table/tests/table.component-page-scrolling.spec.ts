import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TableDataProvider, TableDataSource, TableState } from '@fundamental-ngx/platform/table-helpers';
import { Observable, of } from 'rxjs';
import { SourceItem, generateItems } from './helpers';
import { TableComponent } from '../table.component';
import { PlatformTableModule } from '../table.module';
import { RtlService } from '@fundamental-ngx/cdk/utils';

class TableDataProviderWithPaging extends TableDataProvider<SourceItem> {
    private readonly ALL_ITEMS = generateItems(200);

    items: SourceItem[] = [];
    totalItems = 0;

    fetch(state: TableState): Observable<SourceItem[]> {
        const { currentPage, pageSize } = state.page;

        const items = [...this.ALL_ITEMS];

        this.totalItems = items.length;

        const startIndex = (currentPage - 1) * pageSize;
        this.items = items.slice(startIndex, startIndex + pageSize);

        return of(this.items);
    }
}

@Component({
    template: `
        <fdp-table [dataSource]="source" fdCompact [pageScrolling]="true" [pageSize]="50" bodyHeight="20rem">
            <fdp-column name="name" key="name" label="Name"></fdp-column>
            <fdp-column name="description" key="description" label="Description"></fdp-column>
            <fdp-column name="status" key="status" label="Status"></fdp-column>
        </fdp-table>
    `
})
class TableHostComponent {
    @ViewChild(TableComponent) table: TableComponent;

    source = new TableDataSource(new TableDataProviderWithPaging());
}

describe('TableComponent Page Scrolling', () => {
    let hostComponent: TableHostComponent;
    let fixture: ComponentFixture<TableHostComponent>;
    let tableComponent: TableComponent<SourceItem>;

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

        const originFetch = hostComponent.source.fetch;
        jest.spyOn(hostComponent.source, 'fetch').mockImplementation((state: TableState) =>
            originFetch.call(hostComponent.source, state)
        );

        fixture.detectChanges();

        tableComponent = hostComponent.table;
    });

    let tableBodyRows: DebugElement[] = [];
    let tableBodyContainer: DebugElement;

    const calculateTableElementsMetaData = (): void => {
        tableBodyRows = fixture.debugElement.queryAll(By.css('.fdp-table__body tbody .fd-table__row'));
        tableBodyContainer = fixture.debugElement.query(By.css('.fdp-table__body'));
    };

    beforeEach(() => {
        calculateTableElementsMetaData();
    });

    it('should load first page at initial phase', () => {
        expect(tableBodyRows.length).toBe(50);
    });

    it('should apply "pageSize"=50 to table state', () => {
        expect(tableComponent.getTableState().page.pageSize).toEqual(50);
    });

    it('should have currentPage = 1 as default', () => {
        expect(tableComponent.getTableState().page.currentPage).toEqual(1);
    });

    it('should have table body height = 20rem', () => {
        expect(tableBodyContainer.styles.height).toBe('20rem');
    });

    it('should not trigger fetch if scrolled not to the bottom', () => {
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1); // 1 means initial fetch
        hostComponent.table._onSpyIntersect(false);
        fixture.detectChanges();
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);
    });

    it('should trigger fetch when scrolled to the bottom', async () => {
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1); // 1 means initial fetch
        hostComponent.table._onSpyIntersect(true);
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(2);
    });

    it('should get new 50 items per each request', async () => {
        expect(tableBodyRows.length).toBe(50);
        hostComponent.table._onSpyIntersect(true);
        calculateTableElementsMetaData();

        expect(tableBodyRows.length).toBe(100);
        hostComponent.table._onSpyIntersect(true);
        calculateTableElementsMetaData();

        expect(tableBodyRows.length).toBe(150);
    });

    it('should stop fetching on scroll if currentPage is the last one', async () => {
        hostComponent.table._onSpyIntersect(true); // 100
        hostComponent.table._onSpyIntersect(true); // 150
        hostComponent.table._onSpyIntersect(true); // 200
        calculateTableElementsMetaData();

        expect(tableBodyRows.length).toBe(200);
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(4);

        // try one more
        hostComponent.table._onSpyIntersect(true);
        calculateTableElementsMetaData();

        expect(tableBodyRows.length).toBe(200);
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(4);
    });

    describe('With Initial Scrolling position', () => {
        const initState = (scrollTop): TableState => {
            const defaultState = (hostComponent.table as any)._tableService.getDefaultState();
            return {
                ...defaultState,
                scrollTopPosition: scrollTop
            };
        };

        it('should init table with scrollTop position ZERO', fakeAsync(() => {
            hostComponent.table.setTableState(initState(0));
            (hostComponent.table as any)._initScrollPosition();
            tick(200);
            fixture.detectChanges();

            const scrollTop = hostComponent.table.tableScrollable.getScrollTop();
            expect(scrollTop).toBe(0);
        }));

        it('should init table with scrollTop position 89, when TableState is used', fakeAsync(() => {
            hostComponent.table.setTableState(initState(89));
            (hostComponent.table as any)._initScrollPosition();
            tick(200);
            fixture.detectChanges();

            const scrollTop = hostComponent.table.tableScrollable.getScrollTop();
            expect(scrollTop).toBe(89);
        }));
    });
});
