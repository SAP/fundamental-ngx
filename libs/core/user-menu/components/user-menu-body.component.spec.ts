import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { KeyboardSupportService, RtlService } from '@fundamental-ngx/cdk/utils';
import { UserMenuHeaderDirective } from '../directives/user-menu-header.directive';
import { UserMenuBodyComponent } from './user-menu-body.component';
import { UserMenuContentContainerComponent } from './user-menu-content-container.component';
import { UserMenuListItemComponent } from './user-menu-list-item.component';
import { UserMenuListComponent } from './user-menu-list.component';

@Component({
    template: `
        <fd-user-menu-body #elRef>
            <div fd-user-menu-header></div>
            <div fd-user-menu-content-container>
                <fd-user-menu-list>
                    <li fd-user-menu-list-item text="Item 1"></li>
                    <li fd-user-menu-list-item text="Item 2"></li>
                    <li fd-user-menu-list-item text="Item 3"></li>
                </fd-user-menu-list>
            </div>
        </fd-user-menu-body>
    `,
    standalone: true,
    imports: [
        UserMenuBodyComponent,
        UserMenuHeaderDirective,
        UserMenuContentContainerComponent,
        UserMenuListComponent,
        UserMenuListItemComponent
    ]
})
class TestComponentWithListItems {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;

    @ViewChild(UserMenuBodyComponent)
    bodyComponent: UserMenuBodyComponent;
}

describe('UserMenuBodyComponent', () => {
    let component: TestComponentWithListItems;
    let fixture: ComponentFixture<TestComponentWithListItems>;
    let bodyElement: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponentWithListItems],
            providers: [RtlService, KeyboardSupportService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentWithListItems);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        bodyElement = component.elRef.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(bodyElement.classList).toContain('fd-user-menu__body');
    });

    describe('focus management', () => {
        it('should reset list focus when focus leaves menu entirely', (done) => {
            const listItems = component.bodyComponent['_listItems'];

            // Simulate roving tabindex state where second item was focused
            listItems.toArray()[0]._tabIndex$.set(-1);
            listItems.toArray()[1]._tabIndex$.set(0);
            listItems.toArray()[2]._tabIndex$.set(-1);

            // Create focusout event with relatedTarget outside the menu
            const event = new FocusEvent('focusout', {
                bubbles: true,
                relatedTarget: document.body
            });

            bodyElement.dispatchEvent(event);

            // Wait for setTimeout(0) to complete
            setTimeout(() => {
                // Should reset to first item having tabindex 0
                expect(listItems.toArray()[0]._tabIndex$()).toBe(0);
                expect(listItems.toArray()[1]._tabIndex$()).toBe(-1);
                expect(listItems.toArray()[2]._tabIndex$()).toBe(-1);
                done();
            }, 10);
        });

        it('should not reset list focus when focus moves within menu', () => {
            const listItems = component.bodyComponent['_listItems'];

            // Simulate roving tabindex state where second item was focused
            listItems.toArray()[0]._tabIndex$.set(-1);
            listItems.toArray()[1]._tabIndex$.set(0);
            listItems.toArray()[2]._tabIndex$.set(-1);

            // Create focusout event with relatedTarget inside the menu
            const thirdItem = listItems.toArray()[2]['_elementRef'].nativeElement;
            const event = new FocusEvent('focusout', {
                bubbles: true,
                relatedTarget: thirdItem
            });

            bodyElement.dispatchEvent(event);

            // Should NOT reset - tabindex state should remain unchanged
            expect(listItems.toArray()[0]._tabIndex$()).toBe(-1);
            expect(listItems.toArray()[1]._tabIndex$()).toBe(0);
            expect(listItems.toArray()[2]._tabIndex$()).toBe(-1);
        });

        it('should handle focusout with null relatedTarget', (done) => {
            const listItems = component.bodyComponent['_listItems'];

            // Simulate roving tabindex state where second item was focused
            listItems.toArray()[0]._tabIndex$.set(-1);
            listItems.toArray()[1]._tabIndex$.set(0);
            listItems.toArray()[2]._tabIndex$.set(-1);

            // Create focusout event with null relatedTarget (rapid focus transition)
            const event = new FocusEvent('focusout', {
                bubbles: true,
                relatedTarget: null
            });

            bodyElement.dispatchEvent(event);

            // Wait for setTimeout(0) to check activeElement
            setTimeout(() => {
                // If activeElement is outside menu, should reset
                if (!bodyElement.contains(document.activeElement as HTMLElement)) {
                    expect(listItems.toArray()[0]._tabIndex$()).toBe(0);
                }
                done();
            }, 10);
        });
    });

    describe('stopPropagation on click', () => {
        it('should stop click event propagation', () => {
            const event = new MouseEvent('click', { bubbles: true });
            const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');

            bodyElement.dispatchEvent(event);

            expect(stopPropagationSpy).toHaveBeenCalled();
        });
    });
});
