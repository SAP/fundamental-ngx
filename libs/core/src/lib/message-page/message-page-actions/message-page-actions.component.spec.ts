import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { whenStable } from '../../utils/tests';
import { MessagePageActionsComponent } from './message-page-actions.component';

describe('MessagePageActionsComponent', () => {
    let component: MessagePageActionsComponent;
    let fixture: ComponentFixture<MessagePageActionsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MessagePageActionsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagePageActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement).toHaveClass('fd-message-page__actions');
    });
});
