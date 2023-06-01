import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { DisplayListItemComponent } from './display-list-item.component';
import { DisplayListItemModule } from './display-list-item.module';

import { PlatformListModule } from '../list.module';

export interface Name {
    title: string;
    secondary: string;
    navigationIndicator?: string;
}

@Component({
    selector: 'fdp-test-fdp-display-list-item',
    template: `
        <fdp-list partialNavigation="true">
            <fdp-display-list-item title="title 1" secondary="secondary 1" navigationIndicator="true">
            </fdp-display-list-item>
            <fdp-display-list-item title="title 2" secondary="secondary 2"> </fdp-display-list-item>
            <fdp-display-list-item title="title 3" secondary="secondary 3"> </fdp-display-list-item>
            <fdp-display-list-item title="title 4" secondary="secondary 4" navigationIndicator="true">
            </fdp-display-list-item>
        </fdp-list>
    `
})
class DisplayListItemComponentTestComponent {
    @ViewChild(DisplayListItemComponent, { read: ElementRef, static: true })
    displayListElement: ElementRef;
}

describe('DisplayListItemComponent', () => {
    let component: DisplayListItemComponentTestComponent;
    let fixture: ComponentFixture<DisplayListItemComponentTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DisplayListItemModule, PlatformListModule, RouterTestingModule],
            declarations: [DisplayListItemComponentTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DisplayListItemComponentTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should display list container with role as list', () => {
        const listContainer = fixture.debugElement.query(By.css('ul'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.getAttribute('role')).toEqual('list');
    });

    it('Should contain fd-list in list container', () => {
        const listContainer = fixture.debugElement.query(By.css('ul'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.classList).toContain('fd-list');
    });

    it('Should contain 4 displayable list items', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-display-list-item'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(4);
    });

    it('Display items should have aria-label attribute', () => {
        const secondaryItems = fixture.debugElement.queryAll(By.css('[fd-list-secondary]'));
        expect(secondaryItems[0].nativeElement.getAttribute('aria-label')).toContain('secondary 1');
    });

    it('Should display item role as option', () => {
        const listContainer = fixture.debugElement.query(By.css('fdp-display-list-item .fd-list__item'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.getAttribute('role')).toEqual('option');
    });

    it('Should title 1 title2 2 title 3 and as title 4 as list item', () => {
        const displayItems = fixture.debugElement.queryAll(By.css('.fd-list__title'));
        fixture.detectChanges();
        expect(displayItems[0].nativeElement.getAttribute('title')).toContain('title 1');
        expect(displayItems[1].nativeElement.getAttribute('title')).toContain('title 2');
        expect(displayItems[2].nativeElement.getAttribute('title')).toContain('title 3');
        expect(displayItems[3].nativeElement.getAttribute('title')).toContain('title 4');
    });

    it('Should has unique identification for list item', () => {
        const displayItems = fixture.debugElement.queryAll(By.css('li'));
        fixture.detectChanges();
        expect(displayItems[0].nativeElement.getAttribute('id')).toContain('fdp-list-item');
    });

    it('Should has span element have fd list secondary', () => {
        const spans = fixture.debugElement.queryAll(By.css('span'));
        fixture.detectChanges();
        expect(spans[1].nativeElement.getAttribute('title')).toContain('secondary 1');
    });

    it('Should has span element should have aria-label for accessibility', () => {
        const spans = fixture.debugElement.queryAll(By.css('span'));
        fixture.detectChanges();
        expect(spans[0].nativeElement.getAttribute('aria-label')).toContain('title 1');
    });

    it('Should has partial Navigation on 2 list item', () => {
        const naviationItems = fixture.debugElement.queryAll(By.css('li'));
        expect(naviationItems.length).toEqual(4);
        fixture.detectChanges();
        naviationItems.forEach((navElem) => {
            expect(navElem.nativeElement.classList.contains('fd-list__item'));
        });
    });
});

/** Impertive approach testing*/
@Component({
    selector: 'fdp-test-display-list-item',
    template: `
        <fdp-list partialNavigation="true">
            <fdp-display-list-item
                *ngFor="let item of items"
                [title]="item.title"
                [secondary]="item.secondary"
                [navigationIndicator]="item.navigationIndicator"
            ></fdp-display-list-item>
        </fdp-list>
    `
})
class TestComponentContentComponent {
    items: Name[] = [
        { title: 'title 1', secondary: 'secondary 1', navigationIndicator: 'true' },
        { title: 'title 2', secondary: 'secondary 2' },
        { title: 'title 3', secondary: 'secondary 3' },
        { title: 'title 4', secondary: 'secondary 4', navigationIndicator: 'true' }
    ];

    @ViewChild(DisplayListItemComponent)
    displayListItem: DisplayListItemComponent;
}

describe('DisplayListItemComponent Imperative', () => {
    let host: TestComponentContentComponent;
    let fixture: ComponentFixture<TestComponentContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DisplayListItemModule, PlatformListModule, RouterTestingModule],
            declarations: [TestComponentContentComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentContentComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should create display list items with given values', () => {
        const displayListElems = fixture.debugElement.queryAll(By.css('li'));
        expect(displayListElems.length).toEqual(4);
        displayListElems.forEach((listElem) => {
            expect(listElem.nativeElement.getAttribute('id')).toBeTruthy();
        });

        const liElems = fixture.debugElement.queryAll(By.css('li'));
        expect(liElems.length).toEqual(4);
        liElems.forEach((liElem) => {
            expect(liElem.nativeElement.getAttribute('tabindex')).toBeTruthy();
        });
    });

    it('Title and secondary should to present for all Items', () => {
        const li0 = fixture.debugElement.queryAll(By.css('li'))[0];
        const displayElems0 = li0.queryAll(By.css('span'));
        expect(displayElems0[0].nativeElement.getAttribute('title')).toEqual('title 1');
        expect(displayElems0[1].nativeElement.getAttribute('title')).toEqual('secondary 1');

        const li1 = fixture.debugElement.queryAll(By.css('li'))[1];
        const displayElems1 = li1.queryAll(By.css('span'));
        expect(displayElems1[0].nativeElement.getAttribute('title')).toEqual('title 2');
        expect(displayElems1[1].nativeElement.getAttribute('title')).toEqual('secondary 2');

        const li2 = fixture.debugElement.queryAll(By.css('li'))[2];
        const displayElems2 = li2.queryAll(By.css('span'));
        expect(displayElems2[0].nativeElement.getAttribute('title')).toEqual('title 3');
        expect(displayElems2[1].nativeElement.getAttribute('title')).toEqual('secondary 3');

        const li3 = fixture.debugElement.queryAll(By.css('li'))[3];
        const displayElems3 = li3.queryAll(By.css('span'));
        expect(displayElems3[0].nativeElement.getAttribute('title')).toEqual('title 4');
        expect(displayElems3[1].nativeElement.getAttribute('title')).toEqual('secondary 4');
    });

    it('Should have partial Navigation enabled 4 list item', () => {
        const naviationItemsImp = fixture.debugElement.queryAll(By.css('li'));
        expect(naviationItemsImp.length).toEqual(4);
        fixture.detectChanges();
        expect(naviationItemsImp[0].nativeElement.classList).toContain('fd-list__item--link');
    });
});
