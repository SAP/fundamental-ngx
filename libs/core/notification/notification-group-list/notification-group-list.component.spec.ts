import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotificationGroupHeaderComponent } from '../notification-group-header/notification-group-header.component';
import { NotificationModule } from '../notification.module';

@Component({
    template: `
        <fd-notification-group-list>
            <fd-notification-group-header [(expanded)]="expanded"></fd-notification-group-header>
        </fd-notification-group-list>
    `
})
class TestComponent {
    @ViewChild(NotificationGroupHeaderComponent)
    notificationGroupHeader: NotificationGroupHeaderComponent;

    expanded = false;
}

describe('NotificationGroupListComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let notificationGroupHeader;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NotificationModule],
            declarations: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        notificationGroupHeader = component.notificationGroupHeader;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit value properly', () => {
        jest.spyOn(notificationGroupHeader.expandedChange, 'emit');
        const event: any = { target: { value: true } };
        notificationGroupHeader.toggleExpand(event);
        fixture.detectChanges();

        expect(notificationGroupHeader.expandedChange.emit).toHaveBeenCalledWith(event.target.value);
    });
});
