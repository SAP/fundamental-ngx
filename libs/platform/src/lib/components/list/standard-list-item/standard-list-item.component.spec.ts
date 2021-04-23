import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ElementRef, ViewChild, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DataProvider, ListDataSource } from '../../../domain/public_api';
import { PlatformListModule } from '../list.module';
import { ListComponent } from '../list.component';
import { StandardListItemComponent } from './standard-list-item.component';
import { StandardListItemModule } from './standard-list-item.module';

const LIST_ELEMENTS: Address[] = [
    { name: 'City1' },
    { name: 'City2' },
    { name: 'City3' },
    { name: 'City4' }];

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
    selector: 'fdp-standard-list-item-test',
    template: `
    <fdp-list #componentElement>
           <fdp-standard-list-item [title]="Title1"></fdp-standard-list-item></fdp-list>

    `
})
class StandardListItemComponentTest {
    @ViewChild('StandardListItemComponent', { read: ElementRef, static: true })
    ref: ElementRef;
}


describe('StandardListItemComponent', () => {
    let component: StandardListItemComponentTest;
    let fixture: ComponentFixture<StandardListItemComponentTest>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StandardListItemComponentTest, StandardListItemComponent, ListComponent],
            imports: [StandardListItemModule, PlatformListModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StandardListItemComponentTest);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

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
    template: `
    <fdp-list #component [dataSource]="dataSource">
    <fdp-standard-list-item #childComponent *fdpItemDef="let address" [title]="address.name">
    </fdp-standard-list-item>
</fdp-list>
    `
})
class StandardListItemDataSourceTestComponent {
    @ViewChild(ListComponent, { static: true }) component: ListComponent;
    @ViewChild(StandardListItemComponent, { static: true }) childComponent: StandardListItemComponent;
    public dataSource = new ListDataSource<Address>(new ListDataProvider());
}

describe('Standard  List Item Component with DataSource', () => {
    let host: StandardListItemDataSourceTestComponent;
    let fixture: ComponentFixture<StandardListItemDataSourceTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StandardListItemDataSourceTestComponent, StandardListItemComponent, ListComponent],
            imports: [PlatformListModule, StandardListItemModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StandardListItemDataSourceTestComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Standard list item should retive the data from datasource', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.queryAll(By.css('.fd-list__item'));
        expect(listElement.length).toBe(4);
    });
});
