import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxCloseIconComponent } from './message-box-close-icon.component';

describe('MessageBoxCloseIconComponent', () => {
    let component: MessageBoxCloseIconComponent;
    let fixture: ComponentFixture<MessageBoxCloseIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageBoxCloseIconComponent],
            providers: [MessageBoxConfig]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageBoxCloseIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
