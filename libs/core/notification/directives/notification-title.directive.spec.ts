import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotificationModule } from '../notification.module';

@Component({
    template: `<h2 #directiveElement fd-notification-title [unread]="true">Notification Test</h2> `,
    standalone: true,
    imports: [NotificationModule]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('NotificationTitleDirective', () => {
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
        expect(component.ref.nativeElement.className).toBe('fd-notification__title fd-notification__title--unread');
    });

    it('should have a default id', () => {
        expect(component.ref.nativeElement.getAttribute('id')).toBeTruthy();
    });
});
