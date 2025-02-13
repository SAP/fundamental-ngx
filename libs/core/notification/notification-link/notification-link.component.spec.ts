import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotificationModule } from '../notification.module';
import { NotificationLinkComponent } from './notification-link.component';

@Component({
    selector: 'fd-notification-link-test',
    template: ` <fd-notification-link #notificationLink></fd-notification-link> `,
    standalone: true,
    imports: [NotificationModule]
})
class TestWrapperComponent {
    notificationLink = viewChild<NotificationLinkComponent>('notificationLink');
}

describe('NotificationLinkComponent', () => {
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
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-link'));
        expect(attributeElement.nativeElement.classList.contains('fd-notification__link')).toBe(true);
    });

    it('should apply proper role', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-link'));
        expect(attributeElement.nativeElement.getAttribute('role')).toBe('link');
    });

    it('should change the inner text when toggleShowMore method is called', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-link'));
        expect(attributeElement.nativeElement.innerHTML).toEqual('<span class="fd-link__content">More</span>');
        component.notificationLink()?.toggleShowMore();
        fixture.detectChanges();
        expect(attributeElement.nativeElement.innerHTML).toEqual('<span class="fd-link__content">Less</span>');
    });
});
