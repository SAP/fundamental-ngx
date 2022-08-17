import { Component, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotificationModule } from '../notification.module';

@Component({
    template: `
        <fd-notification-group-header #groupHeaderRef [(expanded)]="expanded">
            Notification Group Header
        </fd-notification-group-header>
    `
})
class TestComponent {
    @ViewChild('groupHeaderRef', { read: ElementRef })
    groupHeaderRef: ElementRef;

    expanded = false;

    expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}

describe('NotificationGroupHeaderComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let button: ElementRef;
    let buttonIcon: ElementRef;

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
        expect(component.groupHeaderRef.nativeElement.className).toContain('fd-notification__group-header');
    });

    it('should change the icon when the button is clicked', () => {
        button = fixture.debugElement.query(By.css('button'));
        buttonIcon = fixture.debugElement.query(By.css('i'));

        expect(buttonIcon.nativeElement.classList).toContain('sap-icon--slim-arrow-right');

        button.nativeElement.click();
        fixture.detectChanges();

        expect(buttonIcon.nativeElement.classList).toContain('sap-icon--slim-arrow-down');
    });
});
