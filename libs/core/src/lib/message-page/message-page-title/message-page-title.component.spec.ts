import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { whenStable } from '../../utils/tests';
import { MessagePageTitleComponent } from './message-page-title.component';

describe('MessagePageTitleComponent', () => {
    let component: MessagePageTitleComponent;
    let fixture: ComponentFixture<MessagePageTitleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MessagePageTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagePageTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement).toHaveClass('fd-message-page__title');
    });
});
