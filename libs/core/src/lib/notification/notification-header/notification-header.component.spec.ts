import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationHeaderComponent } from './notification-header.component';

describe('NotificationHeaderComponent', () => {
    let component: NotificationHeaderComponent;
    let fixture: ComponentFixture<NotificationHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
