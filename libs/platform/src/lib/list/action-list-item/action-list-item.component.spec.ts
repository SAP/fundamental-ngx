import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ActionListItemComponent } from './action-list-item.component';

import { PlatformListModule } from '../list.module';

export interface Action {
    title: string;
}

@Component({
    selector: 'fdp-test-fdp-action-list-item',
    template: `
        <fdp-list>
            <fdp-action-list-item title="Action 1"> </fdp-action-list-item>
            <fdp-action-list-item title="Action 2"> </fdp-action-list-item>
            <fdp-action-list-item title="Action 3"> </fdp-action-list-item>
            <fdp-action-list-item title="Action 4"> </fdp-action-list-item>
        </fdp-list>
    `
})
class ActionListItemComponentTestComponent {
    @ViewChild(ActionListItemComponent, { read: ElementRef, static: true })
    actionListElement: ElementRef;

    itemclick: string;
    enterPress: string;

    onItemClick(): void {
        this.itemclick = 'mouse is clicked';
    }

    handleKeyboardEvent(): void {
        this.enterPress = 'Enter is pressed';
    }
}

describe('ActionListItemComponent', () => {
    let component: ActionListItemComponentTestComponent;
    let fixture: ComponentFixture<ActionListItemComponentTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformListModule, RouterTestingModule],
            declarations: [ActionListItemComponentTestComponent, ActionListItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionListItemComponentTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should display list container with role as listbox', () => {
        const listContainer = fixture.debugElement.query(By.css('ul'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.getAttribute('role')).toEqual('listbox');
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

    it('Should display action item with role as option', () => {
        const listContainer = fixture.debugElement.query(By.css('fdp-action-list-item .fd-list__item--action'));
        fixture.detectChanges();
        expect(listContainer.nativeElement.getAttribute('role')).toEqual('option');
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

/** Impertive approach testing*/
@Component({
    selector: 'fdp-test-action-list-item',
    template: `
        <fdp-list>
            <fdp-action-list-item *ngFor="let item of items" [title]="item.title"></fdp-action-list-item>
        </fdp-list>
    `
})
class TestComponentContentComponent {
    items: Action[] = [{ title: 'Action 1' }, { title: 'Action 2' }, { title: 'Action 3' }, { title: 'Action 4' }];

    @ViewChild(ActionListItemComponent)
    actionListItem: ActionListItemComponent;
}

describe('ActionListItemComponent Imperative', () => {
    let host: TestComponentContentComponent;
    let fixture: ComponentFixture<TestComponentContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformListModule, RouterTestingModule],
            declarations: [TestComponentContentComponent, ActionListItemComponent]
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
