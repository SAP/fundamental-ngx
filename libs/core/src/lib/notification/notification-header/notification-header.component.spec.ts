import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationHeaderComponent } from './notification-header.component';
import { whenStable } from '@fundamental-ngx/core/tests';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NotificationModule } from '../notification.module';

describe('NotificationHeaderComponent', () => {
    let component: NotificationHeaderComponent;
    let fixture: ComponentFixture<NotificationHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, NotificationModule]
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

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement).toHaveClass('fd-notification__header');
    });
});
