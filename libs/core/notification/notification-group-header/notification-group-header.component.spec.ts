import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationModule } from '../notification.module';
import { By } from '@angular/platform-browser';
import { NotificationGroupHeaderComponent } from './notification-group-header.component';

@Component({
    selector: 'fd-notification-group-header-test',
    template: ` <fd-notification-group-header #notificationGroupHeader>
        <span fd-notification-group-header-title [id]="'fd-notification-group-header-title-1'">Today</span>
    </fd-notification-group-header> `,
    standalone: true,
    imports: [NotificationModule]
})
class TestWrapperComponent {
    notificationGroupHeader = viewChild<NotificationGroupHeaderComponent>('notificationGroupHeader');
}

describe('NotificationGroupHeaderComponent', () => {
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
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.classList.contains('fd-notification-group__header')).toBe(true);
    });

    it('should apply proper role', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.getAttribute('role')).toBe('button');
    });

    it('should have proper tabindex', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should have default title', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.title).toBe('Expand/Collapse');
    });

    it('should have expanded set to false by default', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.getAttribute('aria-expanded')).toBe("false");
    });

    it('should have an arrow', () => {
        const headerArrowElement = fixture.debugElement.query(By.css('.fd-notification-group__header-arrow'));
        expect(headerArrowElement).toBeTruthy();
    });

    it('should expand when toggleExpand method is called', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        component.notificationGroupHeader()?.toggleExpand();
        fixture.detectChanges();
        expect(attributeElement.nativeElement.getAttribute('aria-expanded')).toBe("true");
    });
});
