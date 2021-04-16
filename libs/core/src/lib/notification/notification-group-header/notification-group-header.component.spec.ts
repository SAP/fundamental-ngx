import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationGroupHeaderComponent } from './notification-group-header.component';

describe('NotificationGroupHeaderComponent', () => {
    let component: NotificationGroupHeaderComponent;
    let fixture: ComponentFixture<NotificationGroupHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationGroupHeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationGroupHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
