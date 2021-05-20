import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { whenStable } from '../../utils/tests';
import { MessagePageSubtitleComponent } from './message-page-subtitle.component';

describe('MessagePageSubtitleComponent', () => {
    let component: MessagePageSubtitleComponent;
    let fixture: ComponentFixture<MessagePageSubtitleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MessagePageSubtitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagePageSubtitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement).toHaveClass('fd-message-page__subtitle');
    });
});
