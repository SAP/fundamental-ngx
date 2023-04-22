import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { DataProvider, ListDataSource } from '@fundamental-ngx/platform/shared';
import { Observable, of } from 'rxjs';
import { ListComponent } from '../list.component';
import { PlatformListModule } from '../list.module';
import { StandardListItemComponent } from './standard-list-item.component';
import { StandardListItemModule } from './standard-list-item.module';

const LIST_ELEMENTS: Address[] = [{ name: 'City1' }, { name: 'City2' }, { name: 'City3' }, { name: 'City4' }];

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
    selector: 'fdp-standard-list-item-test',
    template: `
        <fdp-list #componentElement> <fdp-standard-list-item title="Title1"></fdp-standard-list-item></fdp-list>
    `
})
class StandardListItemTestComponent {
    @ViewChild('StandardListItemComponent', { read: ElementRef, static: true })
    ref: ElementRef;
}

describe('StandardListItemComponent', () => {
    let component: StandardListItemTestComponent;
    let fixture: ComponentFixture<StandardListItemTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StandardListItemTestComponent],
            imports: [StandardListItemModule, PlatformListModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(StandardListItemTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a list item', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('li');
        expect(listElement.classList).toContain('fd-list__item');
    });

    it('list item should have tabindex', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('li');
        expect(listElement.getAttribute('tabindex')).toEqual('0');
    });

    it('list item should have id', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('li');
        expect(listElement.getAttribute('id')).toContain('fdp-list-item-');
    });
});

@Component({
    selector: 'fdp-standard-list-item-test',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <fdp-list #component [dataSource]="dataSource">
            <fdp-standard-list-item #childComponent *fdpItemDef="let address" [title]="address.name">
            </fdp-standard-list-item>
        </fdp-list>
    `
})
class StandardListItemDataSourceTestComponent {
    @ViewChild(ListComponent, { static: true }) component: ListComponent<Address>;
    @ViewChild(StandardListItemComponent, { static: true }) childComponent: StandardListItemComponent;
    public dataSource = new ListDataSource<Address>(new ListDataProvider());
}

describe('Standard  List Item Component with DataSource', () => {
    let fixture: ComponentFixture<StandardListItemDataSourceTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StandardListItemDataSourceTestComponent],
            imports: [PlatformListModule, StandardListItemModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(StandardListItemDataSourceTestComponent);
        fixture.detectChanges();
        fixture.whenRenderingDone();
    }));

    it('Standard list item should retrieve the data from datasource', () => {
        const listElement = fixture.debugElement.queryAll(By.css('.fd-list__item'));
        expect(listElement.length).toBe(4);
    });
});
