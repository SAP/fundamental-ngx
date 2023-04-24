import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxBodyComponent } from './message-box-body.component';
import { whenStable } from '@fundamental-ngx/core/tests';
import { MessageBoxHost, MessageBoxConfig } from './../utils/message-box-config.class';

describe('MessageBoxBodyComponent', () => {
    let component: MessageBoxBodyComponent;
    let fixture: ComponentFixture<MessageBoxBodyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageBoxBodyComponent],
            providers: [
                {
                    provide: MessageBoxHost,
                    useValue: { _messageBoxConfig: { ...new MessageBoxConfig(), verticalPadding: false } }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageBoxBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement.classList.contains('fd-message-box__body--no-vertical-padding')).toBe(true);
    });
});
