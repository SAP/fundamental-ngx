import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { DataProvider, ListDataSource } from '../../../domain/public_api';
import { ListComponent } from '../list.component';
import { PlatformListModule } from '../list.module';
import { ObjectListItemModule } from './object-list-item.module';
import { ObjectListItemComponent } from './object-list-item.component';
import { ObjectListItemRowComponent } from './object-list-item-row.component';

@Component({
    selector: 'fdp-test-fdp-display-list-item',
    template: `
    <fdp-list [hasObject]="true">
    <fdp-object-list-item title="title"
        introductionText="introductionText" currency="euro" amount="247">
        <fdp-object-list-item-row attributeLabel="attribute1">
            <span fd-object-marker glyph="favourite" aria-label="Favourite Icon with Text"></span>
            <span fd-object-marker glyph="flag" aria-label="Flag Icon with Text"></span>
        </fdp-object-list-item-row>
        <fdp-object-list-item-row attributeLabel="attribute2">
            <span fd-object-status status="positive" glyph="flag"
                label="avialable" inverted="true"></span>
         </fdp-object-list-item-row>
        <fdp-object-list-item-row attributeLabel="attribute3">
            <span fd-object-status status="negative" glyph="flag"
                label="out of stock" inverted="false"></span>
         </fdp-object-list-item-row>
    </fdp-object-list-item>
</fdp-list>
    `
})
class ObjectListItemComponentTest {

    @ViewChild(ObjectListItemComponent, { read: ElementRef, static: true })
    displayListElement: ElementRef;

}

describe('ObjectListItemComponent', () => {
    let component: ObjectListItemComponentTest;
    let fixture: ComponentFixture<ObjectListItemComponentTest>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformListModule, ObjectListItemModule, RouterTestingModule],
            declarations: [ObjectListItemComponentTest, ObjectListItemComponent, ListComponent, ObjectListItemRowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectListItemComponentTest);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should contain fd-list in list container', () => {
        const listContainer = fixture.debugElement.query(By.css('ul'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.classList).toContain('fd-list');
    });

    it('Should contain fd-list in list should have object list enabled', () => {
        const listContainer = fixture.debugElement.query(By.css('ul'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.classList).toContain('fd-object-list');
    });

    it('Should contain Object list item', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-object-list-item'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(1);
    });

    it('Object list item should have title defined', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fd-object-identifier__title'));
        fixture.detectChanges();
        listItems.forEach((listElem) => {
            expect(listElem.nativeElement.textContent).toContain('title');
        });
    });

    it('Object list item has role as list item', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-object-list-item'));
        fixture.detectChanges();
        listItems.forEach((listElem) => {
            expect(listElem.nativeElement.getAttribute('role')).toEqual('listitem');
        });
    });

    it('object list item have introduction text', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-object-list-item'));
        fixture.detectChanges();
        listItems.forEach((listElem) => {
            expect(listElem.nativeElement.getAttribute('introductionText')).toEqual('introductionText');
        });
    });

    it('object list item have currency type defined', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-object-list-item'));
        fixture.detectChanges();
        listItems.forEach((listElem) => {
            expect(listElem.nativeElement.getAttribute('currency')).toEqual('euro');
        });
    });

    it('object list item have amount value', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-object-list-item'));
        fixture.detectChanges();
        listItems.forEach((listElem) => {
            expect(listElem.nativeElement.getAttribute('amount')).toEqual('247');
        });
    });

    it('object list item should have id present', () => {
        const listItems = fixture.debugElement.queryAll(By.css('li'));
        fixture.detectChanges();
        listItems.forEach((listElem) => {
            expect(listElem.nativeElement.getAttribute('id')).toContain('fdp-list-item');
        });
    });

    it('object list item should start with a container', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-list__container'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(1);
    });

    it('object list item should have identifier', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-identifier'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(1);
        expect(listItems[0].nativeElement.classList).toContain('fd-object-list__object-identifier');
    });

    it('object list item should have object list item rows', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-object-list-item-row'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(3);
    });

    it('object list item should have Attribute label present', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-object-list-item-row'));
        fixture.detectChanges();
        expect(listItems[0].nativeElement.getAttribute('attributelabel')).toContain('attribute1');
    });

    it('object list item should have fd-object-list__row', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-list__row'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(3);
    });

    it('object list item should have left division', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-list__row-left'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(3);
    });

    it('object list item should have right division', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-list__row-right'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(3);
    });

    it('object list item right division should have marker properties defined', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-list__row-right'));
        fixture.detectChanges();
        const markerSpans = listItems[0].queryAll(By.css('span'));
        expect(markerSpans[0].nativeElement.getAttribute('glyph')).toContain('favourite');
        expect(markerSpans[0].nativeElement.getAttribute('aria-label')).toContain('Favourite Icon with Text');
        expect(markerSpans[1].nativeElement.getAttribute('glyph')).toContain('flag');
        expect(markerSpans[1].nativeElement.getAttribute('aria-label')).toContain('Flag Icon with Text');
    });

    it('object list item right division should have status defined properties defined', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-list__row-right'));
        fixture.detectChanges();
        const statusSpans = listItems[1].queryAll(By.css('span'));
        expect(statusSpans[0].nativeElement.getAttribute('status')).toContain('positive');
        expect(statusSpans[0].nativeElement.getAttribute('label')).toContain('avialable');
        expect(statusSpans[0].nativeElement.getAttribute('glyph')).toContain('flag');
        expect(statusSpans[0].nativeElement.getAttribute('inverted')).toContain('true');

        const secondStatus = listItems[2].queryAll(By.css('span'));
        expect(secondStatus[0].nativeElement.getAttribute('status')).toContain('negative');
        expect(secondStatus[0].nativeElement.getAttribute('label')).toContain('out of stock');
        expect(secondStatus[0].nativeElement.getAttribute('glyph')).toContain('flag');
        expect(secondStatus[0].nativeElement.getAttribute('inverted')).toContain('false');
    });
});


/* DataSource in imperative approach testing */


const LIST_ELEMENTS: Product[] = [
    {
        title: 'Notebook Basic 15',
        introductionText: 'First product with discount',
        currency: 'Euro',
        amount: '87.50',
        image: 'https://picsum.photos/400/400',
        gylp1: 'add-favorite',
        gylp2: 'flag',
        attribute2: '',
        attribute1: '125 g',
        attribute3: '145 x 140 x 360 cm',
        status1: 'critical',
        statusgyph1: 'status-critical',
        statuslabel1: 'Critical',
        inverted1: false,
        status2: 'informative',
        statusgyph2: '',
        statuslabel2: 'Informative',
        inverted2: true,
        decimal: 2
    },
    {
        title: 'Notebook Basic 16',
        introductionText: 'First product with discount',
        currency: 'Euro',
        amount: '237.50',
        image: 'https://picsum.photos/400/400',
        gylp1: 'request',
        gylp2: 'flag',
        attribute1: '155 x 240 x 160 cm',
        attribute2: '125.50 kg',
        attribute3: '145 x 140 x 360 cm',
        status1: '',
        statusgyph1: 'to-be-reviewed',
        statuslabel1: 'Default',
        inverted1: true,
        status2: '',
        statusgyph2: '',
        statuslabel2: '',
        inverted2: false,
        decimal: 2
    },
    {
        title: 'Notebook Basic 17',
        introductionText: 'No discount',
        currency: 'Euro',
        amount: '117.50',
        image: 'https://picsum.photos/400/400',
        gylp1: 'add-favorite',
        gylp2: 'user-edit',
        attribute1: 'Fixed rate',
        attribute2: '125 g',
        attribute3: '145 x 140 x 360 cm',
        status1: 'positive',
        statusgyph1: '',
        statuslabel1: 'Positive',
        inverted1: false,
        status2: 'negative',
        statusgyph2: 'status-negative',
        statuslabel2: '',
        inverted2: true,
        decimal: 2
    },
    {
        title: 'Notebook Basic 18',
        introductionText: '',
        currency: 'Euro',
        amount: '734.50',
        image: 'https://picsum.photos/400/400',
        gylp1: '',
        gylp2: 'private',
        attribute1: '12g',
        attribute2: 'Not for resale',
        attribute3: '145 x 140 x 360 cm',
        status1: 'critical',
        statusgyph1: 'status-critical',
        statuslabel1: 'Critical',
        inverted1: false,
        status2: 'informative',
        statusgyph2: 'hint',
        statuslabel2: 'Informative',
        inverted2: true,
        decimal: 2
    }];

export interface Product {
    title: string;
    introductionText: string;
    currency: string;
    amount: string;
    image: string;
    gylp1: string;
    gylp2: string;
    attribute1: string;
    attribute2: string;
    attribute3: string;
    status1: string;
    statusgyph1: string;
    statuslabel1: string;
    inverted1: boolean;
    status2: string;
    statusgyph2: string;
    statuslabel2: string;
    inverted2: boolean;
    decimal: number;
}

export class ListDataProvider extends DataProvider<Product> {
    constructor() {
        super();
    }
    fetch(params: Map<string, string>): Observable<Product[]> {
        let data = LIST_ELEMENTS;
        if (!!params.get('name')) {
            const keyword = params.get('name').toLowerCase();
            data = data.filter((item) => item.title.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}

@Component({
    selector: 'fdp-object-list-item-datasource-test',
    template: `
    <fdp-list [hasObject]="true" [dataSource]="_dataSource"
    noBorder="true">
    <fdp-object-list-item *fdpItemDef="let product" [title]="product.title"
        [introductionText]="product.introductionText" [currency]="product.currency" [amount]="product.amount"
        [image]="product.image" [decimal]="product.decimal">
        <fdp-object-list-item-row [attributeLabel]="product.attribute1">
            <span fd-object-marker glyph="product.gylp1" aria-label="Favourite Icon with Text"></span>
            <span fd-object-marker glyph="product.gylp2" aria-label="Flag Icon with Text"></span>
        </fdp-object-list-item-row>
        <fdp-object-list-item-row [attributeLabel]="product.attribute2">
            <span fdp-object-status status="product.status1" glyph="product.statusgyph1"
                label="product.statuslabel1" inverted="product.inverted1"></span> </fdp-object-list-item-row>
        <fdp-object-list-item-row [attributeLabel]="product.attribute3">
            <span fd-object-status status="product.status2" glyph="product.statusgyph2"
                label="product.statuslabel2" inverted="product.inverted2"></span> </fdp-object-list-item-row>
    </fdp-object-list-item>
</fdp-list>

    `
})
class ObjectListItemDataSourceTestComponent {
    @ViewChild(ListComponent, { static: true }) component: ListComponent;
    @ViewChild(ObjectListItemComponent, { static: true }) childComponent: ObjectListItemComponent;
    public _dataSource = new ListDataSource<Product>(new ListDataProvider());
}

describe('Object  List Item Component with DataSource', () => {
    let component: ObjectListItemDataSourceTestComponent;
    let fixture: ComponentFixture<ObjectListItemDataSourceTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformListModule, RouterTestingModule, ObjectListItemModule],
            declarations: [ObjectListItemDataSourceTestComponent, ObjectListItemComponent, ListComponent, ObjectListItemRowComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectListItemDataSourceTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Object list container with role as list', () => {
        const listContainer = fixture.debugElement.query(By.css('ul'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.getAttribute('role')).toEqual('list');
    });

    it('Should contain fd-list and fd-object-list class in list', () => {
        const listContainer = fixture.debugElement.query(By.css('ul'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.classList).toContain('fd-list');
        expect(listContainer.nativeElement.classList).toContain('fd-object-list');
    });

    it('Should contain four Object list item', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-object-list-item'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(4);
    });

    it('All Object list item should have titles', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-identifier__title'));
        fixture.detectChanges();
        expect(listItems[0].nativeElement.textContent).toContain('Notebook Basic 15');
        expect(listItems[1].nativeElement.textContent).toContain('Notebook Basic 16');
        expect(listItems[2].nativeElement.textContent).toContain('Notebook Basic 17');
        expect(listItems[3].nativeElement.textContent).toContain('Notebook Basic 18');
    });

    it('All Object list item should have images', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-object-list-item'));
        fixture.detectChanges();
        listItems.forEach((listElem) => {
            expect(listElem.nativeElement.getAttribute('ng-reflect-image')).toContain('https://picsum.photos/400/400');
        });
    });

    it('All Object list item should have currency defines', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-number__unit'));
        fixture.detectChanges();
        listItems.forEach((listElem) => {
            expect(listElem.nativeElement.textContent).toContain('Euro');
        });
    });

    it('All Object list item should have amount defined', () => {
        const listItems = fixture.debugElement.queryAll(By.css('.fd-object-number__text'));
        fixture.detectChanges();
        expect(listItems[0].nativeElement.textContent).toContain('87.50');
        expect(listItems[1].nativeElement.textContent).toContain('237.50');
        expect(listItems[2].nativeElement.textContent).toContain('117.50');
        expect(listItems[3].nativeElement.textContent).toContain('734.50');
    });

});
