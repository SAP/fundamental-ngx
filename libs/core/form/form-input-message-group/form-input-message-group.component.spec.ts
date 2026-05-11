import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { FormMessageComponent } from '../form-message/form-message.component';
import { FormInputMessageGroupComponent } from './form-input-message-group.component';

@Component({
    template: `
        <fd-form-input-message-group #group1>
            <input id="input1" />
            <fd-form-message type="error">Error 1</fd-form-message>
        </fd-form-input-message-group>

        <fd-form-input-message-group #group2>
            <input id="input2" />
            <fd-form-message type="error">Error 2</fd-form-message>
        </fd-form-input-message-group>
    `,
    imports: [FormInputMessageGroupComponent, FormMessageComponent]
})
class TwoGroupsTestComponent {
    @ViewChild('group1')
    group1: FormInputMessageGroupComponent;

    @ViewChild('group2')
    group2: FormInputMessageGroupComponent;
}

describe('FormInputMessageGroupComponent', () => {
    let component: FormInputMessageGroupComponent;
    let fixture: ComponentFixture<FormInputMessageGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormInputMessageGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormInputMessageGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

describe('FormInputMessageGroupComponent — focus transfer between groups', () => {
    let fixture: ComponentFixture<TwoGroupsTestComponent>;
    let hostEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TwoGroupsTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TwoGroupsTestComponent);
        fixture.detectChanges();
        hostEl = fixture.nativeElement;
    });

    it('should transfer focus to second input on single click without requiring double-click', fakeAsync(() => {
        const input1: HTMLInputElement = hostEl.querySelector('#input1')!;
        const input2: HTMLInputElement = hostEl.querySelector('#input2')!;

        // Focus input1 — this opens popover1's message
        input1.focus();
        input1.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(document.activeElement).toBe(input1);
        // Popover1 should be open
        expect(fixture.componentInstance.group1._popover.isOpen()).toBe(true);

        // Simulate clicking input2: browser fires focusout on input1's control, then focusin on input2's control
        // This is the sequence that causes the bug: focusout triggers dispose() which disrupts focus
        input1.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: input2 }));
        fixture.detectChanges();
        tick();

        // At this point, the overlay dispose from group1's popover should NOT prevent
        // focus from landing on input2
        input2.focus();
        input2.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: input1 }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        // Focus MUST land on input2 after a single interaction
        expect(document.activeElement).toBe(input2);
        // Popover1 should be closed, popover2 should be open
        expect(fixture.componentInstance.group1._popover.isOpen()).toBe(false);
        expect(fixture.componentInstance.group2._popover.isOpen()).toBe(true);
    }));

    it('should not restore focus to previous element when closing due to focusout', fakeAsync(() => {
        const input1: HTMLInputElement = hostEl.querySelector('#input1')!;
        const input2: HTMLInputElement = hostEl.querySelector('#input2')!;

        // Open popover on input1
        input1.focus();
        input1.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const group1 = fixture.componentInstance.group1;
        expect(group1._popover.isOpen()).toBe(true);

        // Fire focusout (simulating click on input2)
        input1.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: input2 }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        // Focus input2 — simulating browser's natural focus transfer
        input2.focus();
        input2.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: input1 }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        // The popover close should NOT have called _focusLastActiveElementBeforeOpen
        // which would steal focus back to input1
        expect(document.activeElement).toBe(input2);
    }));
});
