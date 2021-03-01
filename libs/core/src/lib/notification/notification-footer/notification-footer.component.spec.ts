import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationFooterComponent } from './notification-footer.component';

describe('NotificationFooterComponent', () => {
    let component: NotificationFooterComponent;
    let fixture: ComponentFixture<NotificationFooterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationFooterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
