import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotificationModule } from '../notification.module';

@Component({
    template: `<div #directiveElement fd-notification-list>Notification List Test</div> `,
    standalone: true,
    imports: [NotificationModule]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('NotificationListDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-notification-list');
    });

    it('should assign default role', () => {
        expect(component.ref.nativeElement.getAttribute('role')).toBe('list');
    });

    it('should assign default aria lebel', () => {
        expect(component.ref.nativeElement.getAttribute('aria-label')).toBe('Notifications');
    });
});
