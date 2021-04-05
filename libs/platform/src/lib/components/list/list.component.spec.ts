import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { DataProvider, ListDataSource } from '../../domain/public_api';
import { ListComponent } from './list.component';
import { PlatformListModule } from './list.module';
import { StandardListItemModule } from './standard-list-item/standard-list-item.module';
import { StandardListItemComponent } from './standard-list-item/standard-list-item.component';


const LIST_ELEMENTS: Address[] = [
    { name: 'Name1' },
    { name: 'Name2' },
    { name: 'Name3' },
    { name: 'Name4' }];

export interface Address {
    name: string;
}

export class ListDataProvider extends DataProvider<Address> {
    constructor() {
        super();
    }
    fetch(params: Map<string, string>): Observable<Address[]> {
        let data = LIST_ELEMENTS;
        if (!!params.get('name')) {
            const keyword = params.get('name').toLowerCase();
            data = data.filter((city) => city.name.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}
@Component({
    selector: 'fdp-list-test',
    template: `
    <fdp-list #componentElement
             [noBorder]="true"
             [hasByLine]="true"
             [navigated]="true"
             [selectionMode]="'multi'"
             [navigationIndicator]="true">
           <fdp-standard-list-item [title]="Item1"></fdp-standard-list-item></fdp-list>

    `
})
class ListComponentTest {

    @ViewChild(ListComponent, { read: ElementRef, static: true })
    listElement: ElementRef;

}

describe('ListComponent', () => {
    let component: ListComponentTest;
    let fixture: ComponentFixture<ListComponentTest>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformListModule, StandardListItemModule, RouterTestingModule],
            declarations: [ListComponentTest, StandardListItemComponent, ListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponentTest);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should display list container with role as list', () => {
        const listContainer = fixture.debugElement.nativeElement.querySelector('ul');
        fixture.detectChanges();
        expect(listContainer.getAttribute('role')).toEqual('list');
    });

    it('Should contain fd-list in list container', () => {
        const listContainer = fixture.debugElement.nativeElement.querySelector('ul');
        fixture.detectChanges();
        expect(listContainer.classList).toContain('fd-list');
    });

    it('should contain list--no-border class', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('ul');
        expect(listElement.classList).toContain('fd-list--no-border');
    });

    it('should contain by Line class', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('ul');
        expect(listElement.classList).toContain('fd-list--byline');
    });

    it('should contain show navigation arrow', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('ul');
        expect(listElement.classList).toContain('fd-list--navigation-indication');
    });

    it('should contain navigation', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('ul');
        expect(listElement.classList).toContain('fd-list--navigation');
    });
});

@Component({
    selector: 'fdp-list-test',
    template: `
    <fdp-list #component [noBorder]="true" [dataSource]="dataSource">
    <fdp-standard-list-item #childComponent *fdpItemDef="let address" [title]="address.name">
    </fdp-standard-list-item>
</fdp-list>
    `
})
class ListDataSourceTestComponent {
    @ViewChild(ListComponent, { static: true }) component: ListComponent;
    @ViewChild(StandardListItemComponent, { static: true }) childComponent: StandardListItemComponent;
    public dataSource = new ListDataSource<Address>(new ListDataProvider());
}

describe('ListComponent with DataSource', () => {
    let host: ListDataSourceTestComponent;
    let fixture: ComponentFixture<ListDataSourceTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ListDataSourceTestComponent, StandardListItemComponent, ListComponent],
            imports: [PlatformListModule, StandardListItemModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListDataSourceTestComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should retive the data from datasource', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.queryAll(By.css('.fd-list__item'));
        expect(listElement.length).toBe(4);
    });
});
