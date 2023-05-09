import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { whenStable } from '@fundamental-ngx/core/tests';
import { MessagePageMoreComponent } from './message-page-more.component';

describe('MessagePageMoreComponent', () => {
    let component: MessagePageMoreComponent;
    let fixture: ComponentFixture<MessagePageMoreComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MessagePageMoreComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagePageMoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement.classList.contains('fd-message-page__more')).toBe(true);
    });
});
