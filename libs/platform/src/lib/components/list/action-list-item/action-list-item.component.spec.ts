import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ListComponent } from '../list.component';
import { PlatformListModule } from '../list.module';
import { ActionListItemComponent } from './action-list-item.component';

export interface Action {
    title: string;
}

@Component({
    selector: 'fdp-test-fdp-action-list-item',
    template: `
    <fdp-list>
    <fdp-action-list-item title="Action 1">
    </fdp-action-list-item>
    <fdp-action-list-item title="Action 2">
    </fdp-action-list-item>
    <fdp-action-list-item title="Action 3">
    </fdp-action-list-item>
    <fdp-action-list-item title="Action 4">
    </fdp-action-list-item>
</fdp-list>
    `
})
class ActionListItemComponentTest {

    @ViewChild(ActionListItemComponent, { read: ElementRef, static: true })
    actionListElement: ElementRef;

    itemclick: string;
    enterPress: string;

    onItemClick(): void {
        this.itemclick = 'mouse is clicked';
    }

    handleKeyboardEvent(event: KeyboardEvent): void {
        this.enterPress = 'Enter is pressed';
    }

}

describe('ActionListItemComponent', () => {
    let component: ActionListItemComponentTest;
    let fixture: ComponentFixture<ActionListItemComponentTest>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformListModule, RouterTestingModule],
            declarations: [ActionListItemComponentTest, ActionListItemComponent, ListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionListItemComponentTest);
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

    it('Should contain 4 actionable list items', () => {
        const listItems = fixture.debugElement.queryAll(By.css('fdp-action-list-item'));
        fixture.detectChanges();
        expect(listItems.length).toEqual(4);
    });

    it('Actionable items should has class list item actions', () => {
        const actionItems = fixture.debugElement.queryAll(By.css('li'));
        fixture.detectChanges();
        expect(actionItems[0].nativeElement.classList).toContain('fd-list__item--action');
    });

    it('Should display action item  with role as list item', () => {
        const listContainer = fixture.debugElement.query(By.css('fdp-action-list-item'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.getAttribute('role')).toEqual('listitem');
    });

    it('Should Action 1 Action 2 Action 3 and as Action 4  as list item', () => {
        const actionItems = fixture.debugElement.queryAll(By.css('button'));
        fixture.detectChanges();
        expect(actionItems[0].nativeElement.getAttribute('title')).toContain('Action 1');
        expect(actionItems[1].nativeElement.getAttribute('title')).toContain('Action 2');
        expect(actionItems[2].nativeElement.getAttribute('title')).toContain('Action 3');
        expect(actionItems[3].nativeElement.getAttribute('title')).toContain('Action 4');
    });

    it('Should has unique identification for list item', () => {
        const actionItems = fixture.debugElement.queryAll(By.css('li'));
        fixture.detectChanges();
        expect(actionItems[0].nativeElement.getAttribute('id')).toContain('fdp-list-item');
    });

    it('Should has button element with class fd-list__title', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button'));
        fixture.detectChanges();
        expect(buttons[0].nativeElement.classList).toContain('fd-list__title');
    });

    it('Should has button element should have aria-label for accessibility', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button'));
        fixture.detectChanges();
        expect(buttons[0].nativeElement.getAttribute('aria-label')).toContain('Action 1');
    });
});


describe('ActionListItemComponent functions', () => {
    let component: ActionListItemComponent;
    let fixture: ComponentFixture<ActionListItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformListModule, RouterTestingModule],
            declarations: [ActionListItemComponent, ListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

});


/**Impertive approach testing*/
@Component({
    selector: 'fdp-test-action-list-item',
    template: `
    <fdp-list>
    <fdp-action-list-item *ngFor="let item of items" [title]="item.title"></fdp-action-list-item>
</fdp-list>
    `
})
class TestComponentContent {
    items: Action[] = [
        { 'title': 'Action 1' },
        { 'title': 'Action 2' },
        { 'title': 'Action 3' },
        { 'title': 'Action 4' }];

    @ViewChild(ActionListItemComponent)
    actionListItem: ActionListItemComponent;

}

describe('ActionListItemComponent Imperative', () => {
    let host: TestComponentContent;
    let component: ActionListItemComponent;
    let fixture: ComponentFixture<TestComponentContent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformListModule, RouterTestingModule],
            declarations: [TestComponentContent, ActionListItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentContent);
        host = fixture.componentInstance;
        component = host.actionListItem;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should create action list items with given values', () => {

        const actionListElems = fixture.debugElement.queryAll(By.css('li'));
        expect(actionListElems.length).toEqual(4);
        actionListElems.forEach((listElem) => {
            expect(listElem.nativeElement.getAttribute('id')).toBeTruthy();
        });

        const liElems = fixture.debugElement.queryAll(By.css('li'));
        expect(liElems.length).toEqual(4);
        liElems.forEach((liElem) => {
            expect(liElem.nativeElement.getAttribute('tabindex')).toBeTruthy();
        });
    });

    it('Title should to present for all Items', () => {

        const actionElems = fixture.debugElement.queryAll(By.css('button'));

        expect(actionElems[0].nativeElement.getAttribute('title')).toEqual('Action 1');
        expect(actionElems[1].nativeElement.getAttribute('title')).toEqual('Action 2');
        expect(actionElems[2].nativeElement.getAttribute('title')).toEqual('Action 3');
        expect(actionElems[3].nativeElement.getAttribute('title')).toEqual('Action 4');
    });
});
