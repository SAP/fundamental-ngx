import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { DataProvider, ListDataSource } from '@fundamental-ngx/platform/shared';
import { ListComponent } from './list.component';
import { PlatformListModule } from './list.module';
import { StandardListItemComponent } from './standard-list-item/standard-list-item.component';
import { StandardListItemModule } from './standard-list-item/standard-list-item.module';

const LIST_ELEMENTS: Address[] = [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }, { name: 'Name4' }];

export interface Address {
    name: string;
}

export class ListDataProvider extends DataProvider<Address> {
    constructor() {
        super();
    }

    fetch(params: Map<string, string>): Observable<Address[]> {
        let data = LIST_ELEMENTS;
        const name = params.get('name');
        if (name) {
            const keyword = name.toLowerCase();
            data = data.filter((city) => city.name.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}

@Component({
    selector: 'fdp-list-test',
    template: `
        <fdp-list
            #componentElement
            [noBorder]="true"
            [hasByLine]="true"
            [navigated]="true"
            [selectionMode]="'multi'"
            [navigationIndicator]="true"
        >
            <fdp-standard-list-item title="Item1"></fdp-standard-list-item
        ></fdp-list>
    `,
    standalone: true,
    imports: [PlatformListModule, StandardListItemModule, RouterTestingModule]
})
class ListComponentTestComponent {
    @ViewChild(ListComponent, { read: ElementRef, static: true })
    listElement: ElementRef;
}

describe('ListComponent', () => {
    let component: ListComponentTestComponent;
    let fixture: ComponentFixture<ListComponentTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ListComponentTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponentTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display list container with role as list', () => {
        const listContainer = fixture.debugElement.nativeElement.querySelector('.fd-list');
        fixture.detectChanges();
        expect(listContainer.getAttribute('role')).toEqual('list');
    });

    it('should contain fd-list in list container', () => {
        const listContainer = fixture.debugElement.nativeElement.querySelector('.fd-list');
        fixture.detectChanges();
        expect(listContainer.classList).toContain('fd-list');
    });

    it('should contain list--no-border class', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('.fd-list');
        expect(listElement.classList).toContain('fd-list--no-border');
    });

    it('should contain by Line class', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('.fd-list');
        expect(listElement.classList).toContain('fd-list--byline');
    });

    it('should contain show navigation arrow', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('.fd-list');
        expect(listElement.classList).toContain('fd-list--navigation-indication');
    });

    it('should contain navigation', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('.fd-list');
        expect(listElement.classList).toContain('fd-list--navigation-indication');
    });
});

@Component({
    selector: 'fdp-list-test',
    template: `
        <fdp-list #component [noBorder]="true" [dataSource]="dataSource">
            <fdp-standard-list-item #childComponent *fdpItemDef="let address" [title]="address.name">
            </fdp-standard-list-item>
        </fdp-list>
    `,
    standalone: true,
    imports: [PlatformListModule, StandardListItemModule, RouterTestingModule]
})
class ListDataSourceTestComponent {
    @ViewChild(ListComponent, { static: true }) component: ListComponent<Address>;
    @ViewChild(StandardListItemComponent, { static: true }) childComponent: StandardListItemComponent;
    public dataSource = new ListDataSource<Address>(new ListDataProvider());
}

describe('ListComponent with DataSource', () => {
    let fixture: ComponentFixture<ListDataSourceTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ListDataSourceTestComponent]
        }).compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(ListDataSourceTestComponent);
        fixture.detectChanges();
        fixture.whenRenderingDone();
    }));

    it('should receive the data from datasource', () => {
        const listElement = fixture.debugElement.queryAll(By.css('.fd-list__item'));
        expect(listElement.length).toBe(4);
    });
});

@Component({
    selector: 'fdp-list-loading-test',
    template: `
        <fdp-list #component [noBorder]="true" [dataSource]="dataSource">
            <fdp-standard-list-item *fdpItemDef="let address" [title]="address.name"> </fdp-standard-list-item>
        </fdp-list>
    `,
    standalone: true,
    imports: [PlatformListModule, StandardListItemModule, RouterTestingModule]
})
class ListLoadingTestComponent {
    @ViewChild(ListComponent, { static: true }) component: ListComponent<Address>;
    public dataSource: ListDataSource<Address> | null = null;
}

describe('ListComponent loading state', () => {
    let fixture: ComponentFixture<ListLoadingTestComponent>;
    let component: ListLoadingTestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ListLoadingTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListLoadingTestComponent);
        component = fixture.componentInstance;
    });

    it('should show loading skeleton with 3 repeated items when data is not loaded', () => {
        fixture.detectChanges();

        const listElement: HTMLElement = fixture.debugElement.nativeElement;
        const skeletonItems = listElement.querySelectorAll('.fd-list__item fd-skeleton');

        // There are 3 repeated skeleton items
        expect(skeletonItems.length).toBe(3);
    });

    it('should hide loading skeleton when data source provides data', async () => {
        component.dataSource = new ListDataSource<Address>(new ListDataProvider());
        fixture.detectChanges();
        await fixture.whenStable();
        await fixture.whenRenderingDone();

        const listElement: HTMLElement = fixture.debugElement.nativeElement;
        const actualItems = listElement.querySelectorAll('.fd-list__item');
        const skeletonItems = listElement.querySelectorAll('.fd-list__item fd-skeleton');

        expect(actualItems.length).toBe(4);
        expect(skeletonItems.length).toBe(0);
    });
});
