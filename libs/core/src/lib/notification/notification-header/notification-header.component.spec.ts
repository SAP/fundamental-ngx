import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationHeaderComponent } from './notification-header.component';
import { ButtonModule } from '../../button/button.module';

describe('NotificationHeaderComponent', () => {
    let component: NotificationHeaderComponent;
    let fixture: ComponentFixture<NotificationHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [NotificationHeaderComponent]
        }).compileComponents();
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
