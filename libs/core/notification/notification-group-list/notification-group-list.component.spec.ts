import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationModule } from '../notification.module';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-notification-group-list-test',
    template: ` <fd-notification-group-list>Notification Group List Test</fd-notification-group-list> `,
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
});
