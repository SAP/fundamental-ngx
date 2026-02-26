import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { whenStable } from '@fundamental-ngx/core/tests';
import { NotificationModule } from '../notification.module';
import { NotificationHeaderComponent } from './notification-header.component';

describe('NotificationHeaderComponent', () => {
    let component: NotificationHeaderComponent;
    let fixture: ComponentFixture<NotificationHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonComponent, NotificationModule]
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

        expect(fixture.nativeElement.classList.contains('fd-notification__header')).toBe(true);
    });
});
