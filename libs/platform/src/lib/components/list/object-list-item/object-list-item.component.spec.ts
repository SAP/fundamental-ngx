import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ListComponent } from '../list.component';
import { PlatformListModule } from '../list.module';
import { ObjectListItemComponent } from './object-list-item.component';


@Component({
    selector: 'fdp-test-fdp-display-list-item',
    template: `
    <fdp-list partialNavigation="true">
    <fdp-display-list-item title="title 1" secondary="secondary 1" navigationIndicator="true">
    </fdp-display-list-item>
    <fdp-display-list-item title="title 2" secondary="secondary 2">
    </fdp-display-list-item>
    <fdp-display-list-item title="title 3" secondary="secondary 3">
    </fdp-display-list-item>
    <fdp-display-list-item title="title 4" secondary="secondary 4" navigationIndicator="true">
    </fdp-display-list-item>
</fdp-list>
    `
})
class ObjectListItemComponentTest {

    @ViewChild(ObjectListItemComponent, { read: ElementRef, static: true })
    objectListElement: ElementRef;

}

// describe('ObjectListItemComponent', () => {
//     let component: ObjectListItemComponentTest;
//     let fixture: ComponentFixture<ObjectListItemComponentTest>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [PlatformListModule],
//             declarations: [ObjectListItemComponentTest, ObjectListItemComponent, ListComponent]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ObjectListItemComponentTest);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('Should display list container with role as list', () => {
//         const listContainer = fixture.debugElement.query(By.css('fdp-list'));
//         fixture.detectChanges();
//         expect(listContainer.nativeElement.getAttribute('role')).toEqual('list');
//     });

//     it('Should contain fd-list in list container', () => {
//         const listContainer = fixture.debugElement.query(By.css('ul'));
//         fixture.detectChanges();
//         expect(listContainer.nativeElement.classList).toContain('fd-list');
//     });

//     it('Should contain 4 displayable list items', () => {
//         const listItems = fixture.debugElement.queryAll(By.css('fdp-display-list-item'));
//         fixture.detectChanges();
//         expect(listItems.length).toEqual(4);
//     });

//     it('Displayable items should has aria-label attribute', () => {
//         const displayListElems = fixture.debugElement.queryAll(By.css('li'));
//         expect(displayListElems.length).toEqual(4);
//         displayListElems.forEach((listElem) => {
//             expect(listElem.nativeElement.getAttribute('aria-label')).toBeTruthy();
//         });
//     });

//     it('Should display display item  with role as list item', () => {
//         const listContainer = fixture.debugElement.query(By.css('fdp-display-list-item'));
//         fixture.detectChanges();
//         expect(listContainer.nativeElement.getAttribute('role')).toEqual('listitem');
//     });

//     it('Should title 1 title2 2 title 3 and as title 4 as list item', () => {
//         const displayItems = fixture.debugElement.queryAll(By.css('fdp-display-list-item'));
//         fixture.detectChanges();
//         expect(displayItems[0].nativeElement.getAttribute('title')).toContain('title 1');
//         expect(displayItems[1].nativeElement.getAttribute('title')).toContain('title 2');
//         expect(displayItems[2].nativeElement.getAttribute('title')).toContain('title 3');
//         expect(displayItems[3].nativeElement.getAttribute('title')).toContain('title 4');
//     });

//     it('Should has unique identification for list item', () => {
//         const displayItems = fixture.debugElement.queryAll(By.css('li'));
//         fixture.detectChanges();
//         expect(displayItems[0].nativeElement.getAttribute('id')).toContain('fdp-list-item');
//     });

//     it('Should has span element have fd list secondary', () => {
//         const spans = fixture.debugElement.queryAll(By.css('span'));
//         fixture.detectChanges();
//         expect(spans[0].nativeElement.getAttribute('fd-list-secondary')).toBeTruthy();
//     });

//     it('Should has span element should have aria-label for accessibility', () => {
//         const spans = fixture.debugElement.queryAll(By.css('span'));
//         fixture.detectChanges();
//         expect(spans[0].nativeElement.getAttribute('aria-label')).toContain('title 1');
//     });

//     it('Should has partial Navigation on 2 list item', () => {
//         const naviationItems = fixture.debugElement.queryAll(By.css('a'));
//         expect(naviationItems.length).toEqual(2);
//         fixture.detectChanges();
//         expect(naviationItems[0].nativeElement.classList).toContain('fd-list__link--navigation-indicator');
//         expect(naviationItems[1].nativeElement.classList).toContain('fd-list__link--navigation-indicator');
//     });
// });


// describe('ObjectListItemComponent functions', () => {
//     let component: ObjectListItemComponent;
//     let fixture: ComponentFixture<ObjectListItemComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [PlatformListModule],
//             declarations: [ObjectListItemComponent, ListComponent]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ObjectListItemComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

// });


// /**Impertive approach testing*/
// @Component({
//     selector: 'fdp-test-display-list-item',
//     template: `
//     <fdp-list partialNavigation="true">
//     <fdp-display-list-item *ngFor="let item of items" [item]="item"></fdp-display-list-item>
// </fdp-list>
//     `
// })
// class TestComponentContent {
//     items: any[] = [
//         { 'title': 'title 1', 'secondary': 'secondary 1', 'navigationIndicator': 'true' },
//         { 'title': 'title 2', 'secondary': 'secondary 2' },
//         { 'title': 'title 3', 'secondary': 'secondary 3' },
//         { 'title': 'title 4', 'secondary': 'secondary 4', 'navigationIndicator': 'true' }];

//     @ViewChild(ObjectListItemComponent)
//     objectListItem: ObjectListItemComponent;

// }

// describe('ObjectListItemComponent Imperative', () => {
//     let host: TestComponentContent;
//     let component: ObjectListItemComponent;
//     let fixture: ComponentFixture<TestComponentContent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [PlatformListModule],
//             declarations: [TestComponentContent, ObjectListItemComponent]
//         }).compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(TestComponentContent);
//         host = fixture.componentInstance;
//         component = host.objectListItem;
//         fixture.detectChanges();
//     });

//     async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
//         componentFixture.detectChanges();
//         await componentFixture.whenStable();
//     }

//     it('should create', () => {
//         expect(host).toBeTruthy();
//     });

//     it('should create display list items with given values', () => {

//         const displayListElems = fixture.debugElement.queryAll(By.css('li'));
//         expect(displayListElems.length).toEqual(4);
//         displayListElems.forEach((listElem) => {
//             expect(listElem.nativeElement.getAttribute('id')).toBeTruthy();
//         });

//         const liElems = fixture.debugElement.queryAll(By.css('li'));
//         expect(liElems.length).toEqual(4);
//         liElems.forEach((liElem) => {
//             expect(liElem.nativeElement.getAttribute('tabindex')).toBeTruthy();
//         });
//     });

//     it('Title and secondary should to present for all Items', () => {

//         const displayElems0 = fixture.debugElement.queryAll(By.css('li'))[0];
//         expect(displayElems0[0].nativeElement.getAttribute('title')).toEqual('title 1');
//         expect(displayElems0[1].nativeElement.getAttribute('title')).toEqual('secondary 1');

//         const displayElems1 = fixture.debugElement.queryAll(By.css('li'))[1];
//         expect(displayElems1[0].nativeElement.getAttribute('title')).toEqual('title 2');
//         expect(displayElems1[1].nativeElement.getAttribute('title')).toEqual('secondary 2');

//         const displayElems2 = fixture.debugElement.queryAll(By.css('li'))[2];
//         expect(displayElems2[0].nativeElement.getAttribute('title')).toEqual('title 3');
//         expect(displayElems2[1].nativeElement.getAttribute('title')).toEqual('secondary 3');


//         const displayElems3 = fixture.debugElement.queryAll(By.css('li'))[3];
//         expect(displayElems3[0].nativeElement.getAttribute('title')).toEqual('title 4');
//         expect(displayElems3[1].nativeElement.getAttribute('title')).toEqual('secondary 4');
//     });

//     it('Should have partial Navigation enabled 2 list item', () => {
//         const naviationItemsImp = fixture.debugElement.queryAll(By.css('a'));
//         expect(naviationItemsImp.length).toEqual(2);
//         fixture.detectChanges();
//         expect(naviationItemsImp[0].nativeElement.classList).
// toContain('fd-list__link fd-link fdp-link-truncate__txt fd-list__link--navigation-indicator');
//         expect(naviationItemsImp[1].nativeElement.classList).
// toContain('fd-list__link fd-link fdp-link-truncate__txt fd-list__link--navigation-indicator');
//     });

// });
