import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationModule } from '../notification.module';

@Component({
    template: `<fd-notification-body #notificationBodyRef></fd-notification-body>`,
    imports: [NotificationModule]
})
class TestComponent {
    @ViewChild('notificationBodyRef', { read: ElementRef })
    notificationBodyRef: ElementRef;
}

describe('NotificationBodyComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign fd-notification__body class', () => {
        expect(component.notificationBodyRef.nativeElement.className).toContain('fd-notification__body');
    });
});
