import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotificationGroupListComponent } from './notification-group-list.component';
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

describe('FeedInputComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let notificationGroupHeader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotificationModule],
            declarations: [NotificationGroupListComponent, TestComponent, NotificationGroupHeaderComponent]
        })
            .compileComponents();
    });

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
        spyOn(notificationGroupHeader.expandedChange, 'emit');
        const event: any = { target: { value: true } };
        notificationGroupHeader.toggleExpand(event);
        fixture.detectChanges();

        expect(notificationGroupHeader.expandedChange.emit).toHaveBeenCalledWith(event.target.value)
    });  
});
