import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FD_DIALOG_FOCUS_TRAP_ERROR } from '@fundamental-ngx/core/dialog';

import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';
import { MessageBoxDefaultComponent } from './message-box-default.component';

describe('MessageBoxDefaultComponent', () => {
    let component: MessageBoxDefaultComponent;
    const changeDetectorRefMock = { detectChanges: () => {} } as ChangeDetectorRef;

    beforeEach(() => {
        component = new MessageBoxDefaultComponent(new MessageBoxConfig(), changeDetectorRefMock);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call callbacks', () => {
        const messageBoxContent = {
            closeButtonCallback: jest.fn(),
            cancelButtonCallback: jest.fn(),
            approveButtonCallback: jest.fn()
        } as MessageBoxContent;

        component._messageBoxContent = messageBoxContent;

        component._onCloseButton();
        expect(messageBoxContent.closeButtonCallback).toHaveBeenCalled();

        component._onCancelButton();
        expect(messageBoxContent.cancelButtonCallback).toHaveBeenCalled();

        component._onApproveButton();
        expect(messageBoxContent.approveButtonCallback).toHaveBeenCalled();
    });
});

function buildContent(): MessageBoxContent {
    const c = new MessageBoxContent();
    c.title = 'Test';
    c.approveButton = 'Ok';
    c.cancelButton = 'Cancel';
    return c;
}

describe('MessageBoxDefaultComponent — focusTrapped: false', () => {
    let fixture: ComponentFixture<MessageBoxDefaultComponent>;

    beforeEach(async () => {
        const cfg = new MessageBoxConfig();
        cfg.focusTrapped = false;

        await TestBed.configureTestingModule({
            imports: [MessageBoxDefaultComponent, RouterTestingModule],
            providers: [
                { provide: MessageBoxConfig, useValue: cfg },
                { provide: MessageBoxRef, useValue: new MessageBoxRef() },
                { provide: FD_DIALOG_FOCUS_TRAP_ERROR, useValue: true }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MessageBoxDefaultComponent);
        fixture.componentInstance._messageBoxContent = buildContent();
        fixture.detectChanges();
    });

    it('should not move focus to the approve button when focusTrapped is false', async () => {
        document.body.appendChild(fixture.nativeElement);
        await fixture.whenStable();
        const approveBtn = fixture.nativeElement.querySelector('fd-button-bar button');
        // Intentionally weak: we assert the button was not focused, not where focus landed.
        // Asserting === document.body is fragile in jsdom when focus trap is suppressed.
        expect(document.activeElement).not.toBe(approveBtn);
        fixture.nativeElement.remove();
    });
});

describe('MessageBoxDefaultComponent — focusTrapped: true', () => {
    let fixture: ComponentFixture<MessageBoxDefaultComponent>;

    beforeEach(async () => {
        Object.defineProperty(global.window.HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 10 });

        const cfg = new MessageBoxConfig();
        cfg.focusTrapped = true;

        await TestBed.configureTestingModule({
            imports: [MessageBoxDefaultComponent, RouterTestingModule],
            providers: [
                { provide: MessageBoxConfig, useValue: cfg },
                { provide: MessageBoxRef, useValue: new MessageBoxRef() },
                { provide: FD_DIALOG_FOCUS_TRAP_ERROR, useValue: true }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MessageBoxDefaultComponent);
        fixture.componentInstance._messageBoxContent = buildContent();
    });

    afterEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            value: 0
        });
    });

    it('should move focus to the approve button when focusTrapped is true', async () => {
        document.body.appendChild(fixture.nativeElement);
        fixture.detectChanges();
        await fixture.whenStable();
        const approveBtn = fixture.nativeElement.querySelector('fd-button-bar button');
        expect(document.activeElement).toBe(approveBtn);
        fixture.nativeElement.remove();
    });
});
