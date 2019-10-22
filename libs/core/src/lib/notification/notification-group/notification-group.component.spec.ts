import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationGroupComponent } from './notification-group.component';

describe('NotificationGroupComponent', () => {
    let component: NotificationGroupComponent;
    let fixture: ComponentFixture<NotificationGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationGroupComponent]
        })
            .compileComponents();
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
