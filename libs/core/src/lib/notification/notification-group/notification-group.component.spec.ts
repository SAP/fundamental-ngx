import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationGroupComponent } from './notification-group.component';

describe('NotificationGroupComponent', () => {
    let component: NotificationGroupComponent;
    let fixture: ComponentFixture<NotificationGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
