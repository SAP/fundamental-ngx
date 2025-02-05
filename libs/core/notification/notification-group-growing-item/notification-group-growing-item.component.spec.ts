import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotificationModule } from '../notification.module';

@Component({
    selector: 'fd-notification-group-growing-item-test',
    template: `
        <fd-notification-group-growing-item>Notification Group Growing Item Test</fd-notification-group-growing-item>
    `,
    standalone: true,
    imports: [NotificationModule]
})
class TestWrapperComponent {}

describe('NotificationGroupGrowingItemComponent', () => {
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
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-growing-item'));
        expect(attributeElement.nativeElement.classList.contains('fd-notification-group__growing-item')).toBe(true);
    });

    it('should apply proper role', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-growing-item'));
        expect(attributeElement.nativeElement.getAttribute('role')).toBe('button');
    });

    it('should have proper tabindex', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-growing-item'));
        expect(attributeElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });
});
