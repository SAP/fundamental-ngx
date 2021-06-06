import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { whenStable } from '@fundamental-ngx/core/tests';
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

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement).toHaveClass('fd-notification__footer');
    });
});
