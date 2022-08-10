import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationModule } from '../notification.module';

@Component({
    template: ` <fd-notification-body #notificationBodyRef></fd-notification-body> `
})
class TestComponent {
    @ViewChild('notificationBodyRef', { read: ElementRef })
    notificationBodyRef: ElementRef;
}

describe('NotificationBodyComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [NotificationModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.notificationBodyRef.nativeElement.className).toContain('fd-notification__body');
    });
});
