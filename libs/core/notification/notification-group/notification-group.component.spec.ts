import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationModule } from '../notification.module';
import { By } from '@angular/platform-browser';
import { NotificationGroupComponent } from './notification-group.component';
import { NotificationGroupListComponent } from '../notification-group-list/notification-group-list.component';
import { NotificationGroupHeaderComponent } from '../notification-group-header/notification-group-header.component';

@Component({
    selector: 'fd-notification-group-test',
    template: ` 
    <fd-notification-group #notificationGroup [expanded]="true" ariaLabel="Notification Group Test Aria Label">
        <fd-notification-group-header #notificationGroupHeader>
            <span fd-notification-group-header-title id="fd-notification-group-header-title-test-1">Today</span>
        </fd-notification-group-header>
        <fd-notification-group-list #notificationGroupList id="fd-notification-group-list-1">
            Notifications
        </fd-notification-group-list>
    </fd-notification-group> `,
    standalone: true,
    imports: [NotificationModule]
})
class TestWrapperComponent {
    notificationGroup = viewChild<NotificationGroupComponent>('notificationGroup');
    notificationGroupList = viewChild<NotificationGroupListComponent>('notificationGroupList');
    notificationGroupHeader = viewChild<NotificationGroupHeaderComponent>('notificationGroupHeader');
}

describe('NotificationGroupComponent', () => {
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
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group'));
        expect(attributeElement.nativeElement.classList.contains('fd-notification-group')).toBe(true);
    });

    it('should apply proper role', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group'));
        expect(attributeElement.nativeElement.getAttribute('role')).toBe('listitem');
    });

    it('should have proper tabindex', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group'));
        expect(attributeElement.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should have proper aria-level', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group'));
        expect(attributeElement.nativeElement.getAttribute('aria-level')).toBe('1');
    });

    it('should apply aria-label as input', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group'));
        expect(attributeElement.nativeElement.getAttribute('aria-label')).toBe('Notification Group Test Aria Label');
    });

    it('should affect the aria-description when aria-expanded changes', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group'));
        expect(attributeElement.nativeElement.getAttribute('aria-description')).toBe('Notification Group expanded');
    });

    it('should set aria-labelledby from fd-notification-group-header-title child element', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group'));
        expect(attributeElement.nativeElement.getAttribute('aria-labelledby')).toBe('fd-notification-group-header-title-test-1');
    });

    it('should set aria-controls of fd-notification-group-header', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group'));
        expect(attributeElement.nativeElement.getAttribute('aria-labelledby')).toBe('fd-notification-group-header-title-test-1');
    });
});
