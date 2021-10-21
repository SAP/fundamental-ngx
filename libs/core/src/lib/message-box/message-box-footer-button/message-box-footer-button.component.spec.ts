import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxFooterButtonComponent } from './message-box-footer-button.component';

describe('MessageBoxFooterButtonComponent', () => {
    let component: MessageBoxFooterButtonComponent;
    let fixture: ComponentFixture<MessageBoxFooterButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageBoxFooterButtonComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageBoxFooterButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
