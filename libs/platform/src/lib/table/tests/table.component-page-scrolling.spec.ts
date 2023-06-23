import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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

describe('TableComponent Page Scrolling', async () => {
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
        spyOn(hostComponent.source, 'fetch').and.callFake((state: TableState) =>
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

    const tableBodyScrollTop = async (scrollTop): Promise<void> => {
        const container = tableBodyContainer.nativeElement as HTMLElement;
        container.scrollTop = scrollTop;
        await new Promise((resolve) => setTimeout(() => resolve(null), 200));
        fixture.detectChanges();
        calculateTableElementsMetaData();
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
        const container = tableBodyContainer.nativeElement as HTMLElement;
        expect(container.scrollHeight).toBeGreaterThan(container.clientHeight);
    });

    it('should not trigger fetch if scrolled not to the bottom', () => {
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1); // 1 means initial fetch
        const container = tableBodyContainer.nativeElement as HTMLElement;
        container.scrollTop = 100;
        fixture.detectChanges();
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);
    });

    it('should trigger fetch when scrolled to the bottom', async () => {
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1); // 1 means initial fetch
        const container = tableBodyContainer.nativeElement as HTMLElement;
        await tableBodyScrollTop(container.scrollHeight);
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(2);
    });

    // TODO: flaky test  https://github.com/SAP/fundamental-ngx/issues/7534
    xit('should get new 50 items per each request', async () => {
        await tableBodyScrollTop(999999);

        expect(tableBodyRows.length).toBe(100);

        await tableBodyScrollTop(999999);

        expect(tableBodyRows.length).toBe(150);
    });

    // TODO: flaky test  https://github.com/SAP/fundamental-ngx/issues/7534
    xit('should stop fetching on scroll if currentPage is the last one', async () => {
        await tableBodyScrollTop(999999); // 100
        await tableBodyScrollTop(999999); // 150
        await tableBodyScrollTop(999999); // 200

        expect(tableBodyRows.length).toBe(200);
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(4);

        // try one more
        await tableBodyScrollTop(0);
        await tableBodyScrollTop(999999);

        expect(tableBodyRows.length).toBe(200);
        expect(hostComponent.source.fetch).toHaveBeenCalledTimes(4);
    });
});
