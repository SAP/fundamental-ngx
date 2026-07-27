import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotificationModule } from '../notification.module';

@Component({
    selector: 'fd-notification-group-list-test',
    template: `
        <fd-notification-group-list>
            <fd-notification>
                <button class="notification-action">Action 1</button>
            </fd-notification>
            <fd-notification>
                <button class="notification-action">Action 2</button>
            </fd-notification>
            <fd-notification>
                <a href="#" class="notification-link">Link 3</a>
            </fd-notification>
            <button class="load-more">Load more</button>
        </fd-notification-group-list>
    `,
    standalone: true,
    imports: [NotificationModule]
})
class TestWrapperComponent {}

describe('NotificationGroupListComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestWrapperComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper class', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-list'));
        expect(attributeElement.nativeElement.classList.contains('fd-notification-group__list')).toBe(true);
    });

    it('should apply proper role', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-list'));
        expect(attributeElement.nativeElement.getAttribute('role')).toBe('list');
    });

    it('should set notification children role to listitem', () => {
        const notifications = fixture.debugElement.queryAll(By.css('fd-notification'));
        notifications.forEach((notification) => {
            expect(notification.nativeElement.getAttribute('role')).toBe('listitem');
        });
    });

    it('should move to next notification with ArrowDown and keep focused element path', () => {
        const actionButtons = fixture.debugElement.queryAll(By.css('.notification-action'));
        const firstButton = actionButtons[0].nativeElement as HTMLButtonElement;
        const secondButton = actionButtons[1].nativeElement as HTMLButtonElement;

        firstButton.focus();
        firstButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

        expect(document.activeElement).toBe(secondButton);
    });

    it('should move to previous notification with ArrowUp and keep focused element path', () => {
        const actionButtons = fixture.debugElement.queryAll(By.css('.notification-action'));
        const firstButton = actionButtons[0].nativeElement as HTMLButtonElement;
        const secondButton = actionButtons[1].nativeElement as HTMLButtonElement;

        secondButton.focus();
        secondButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));

        expect(document.activeElement).toBe(firstButton);
    });

    it('should move to first notification with Home', () => {
        const actionButtons = fixture.debugElement.queryAll(By.css('.notification-action'));
        const firstButton = actionButtons[0].nativeElement as HTMLButtonElement;
        const secondButton = actionButtons[1].nativeElement as HTMLButtonElement;

        secondButton.focus();
        secondButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));

        expect(document.activeElement).toBe(firstButton);
    });

    it('should move to last notification before load more with End', () => {
        const firstButton = fixture.debugElement.query(By.css('.notification-action'))
            .nativeElement as HTMLButtonElement;
        const thirdNotificationLink = fixture.debugElement.query(By.css('.notification-link'))
            .nativeElement as HTMLAnchorElement;
        const loadMoreButton = fixture.debugElement.query(By.css('.load-more')).nativeElement as HTMLButtonElement;

        firstButton.focus();
        firstButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));

        expect(document.activeElement).toBe(thirdNotificationLink);
        expect(document.activeElement).not.toBe(loadMoreButton);
    });

    it('should move to closest focus target when same element does not exist', () => {
        const secondButton = fixture.debugElement.queryAll(By.css('.notification-action'))[1]
            .nativeElement as HTMLButtonElement;
        const thirdNotificationLink = fixture.debugElement.query(By.css('.notification-link'))
            .nativeElement as HTMLAnchorElement;

        secondButton.focus();
        secondButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

        expect(document.activeElement).toBe(thirdNotificationLink);
    });
});
