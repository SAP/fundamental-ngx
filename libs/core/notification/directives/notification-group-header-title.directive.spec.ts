import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotificationModule } from '../notification.module';

@Component({
    template: `<span #directiveElement fd-notification-group-header-title>Notification Group Header Title Test</span> `,
    standalone: true,
    imports: [NotificationModule]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('NotificationGroupHeaderTitleDirective', () => {
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
        expect(component.ref.nativeElement.className).toBe('fd-notification-group__header-title');
    });

    it('should assign default role', () => {
        expect(component.ref.nativeElement.getAttribute('role')).toBe('heading');
    });

    it('should assign default aria level', () => {
        expect(component.ref.nativeElement.getAttribute('aria-level')).toBe('3');
    });
});
