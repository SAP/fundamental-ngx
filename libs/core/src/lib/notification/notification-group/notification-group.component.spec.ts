import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationModule } from '../notification.module';

@Component({
    template: ` <fd-notification-group #notificationGroupRef [mobile]="mobile"></fd-notification-group> `
})
class TestComponent {
    @ViewChild('notificationGroupRef', { read: ElementRef })
    notificationGroupRef: ElementRef;

    mobile = false;
}

describe('NotificationGroupComponent', () => {
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
        expect(component.notificationGroupRef.nativeElement.className).toContain(
            'fd-notification fd-notification--group fd-notification-custom-block'
        );
    });

    it('should assign additional classes', () => {
        component.mobile = true;
        fixture.detectChanges();
        expect(component.notificationGroupRef.nativeElement.classList).toContain('fd-notification--mobile');
    });
});
