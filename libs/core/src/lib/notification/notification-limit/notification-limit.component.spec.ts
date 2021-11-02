import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotificationLimitComponent } from './notification-limit.component';
import { whenStable } from '@fundamental-ngx/core/tests';

describe('NotificationLimitComponent', () => {
    let component: NotificationLimitComponent;
    let fixture: ComponentFixture<NotificationLimitComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [NotificationLimitComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationLimitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement).toHaveClass('fd-notification__limit');
    });
});
