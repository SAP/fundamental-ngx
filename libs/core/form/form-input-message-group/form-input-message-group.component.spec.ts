import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

@Component({
    template: `
        <fd-form-input-message-group>
            <input id="input-a" />
            <fd-form-message type="error">Error A</fd-form-message>
        </fd-form-input-message-group>

        <fd-form-input-message-group>
            <input id="input-b" />
            <fd-form-message type="warning">Warning B</fd-form-message>
        </fd-form-input-message-group>

        <fd-form-input-message-group>
            <input id="input-c" />
            <fd-form-message type="information">Info C</fd-form-message>
        </fd-form-input-message-group>

        <fd-form-input-message-group>
            <input id="input-d" />
            <fd-form-message type="error">Error D</fd-form-message>
        </fd-form-input-message-group>
    `,
    imports: [FormInputMessageGroupComponent, FormMessageComponent]
})
class FourGroupsTestComponent {
    @ViewChildren(FormInputMessageGroupComponent)
    groups: QueryList<FormInputMessageGroupComponent>;
}

@Component({
    template: `
        <fd-form-input-message-group placementContainer="self" #group1>
            <input id="input-self-1" />
            <fd-form-message type="error">Error 1</fd-form-message>
        </fd-form-input-message-group>

        <fd-form-input-message-group placementContainer="self" #group2>
            <input id="input-self-2" />
            <fd-form-message type="error">Error 2</fd-form-message>
        </fd-form-input-message-group>
    `,
    imports: [FormInputMessageGroupComponent, FormMessageComponent]
})
class SelfContainerGroupsTestComponent {
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

describe('FormInputMessageGroupComponent — rapid focus switching across 4 groups', () => {
    let fixture: ComponentFixture<FourGroupsTestComponent>;
    let hostEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FourGroupsTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FourGroupsTestComponent);
        fixture.detectChanges();
        hostEl = fixture.nativeElement;
    });

    it('should handle rapid sequential focus changes across all 4 inputs', fakeAsync(() => {
        const inputs = ['#input-a', '#input-b', '#input-c', '#input-d'].map(
            (sel) => hostEl.querySelector<HTMLInputElement>(sel)!
        );

        // Focus each input in rapid succession, simulating user clicking through all 4
        for (let i = 0; i < inputs.length; i++) {
            const current = inputs[i];
            const previous = i > 0 ? inputs[i - 1] : null;

            // Focusout from previous (if any)
            if (previous) {
                previous.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: current }));
                fixture.detectChanges();
                tick();
            }

            // Focus current
            current.focus();
            current.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: previous }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(document.activeElement).toBe(current);
        }

        // After cycling through all 4, the last input should be focused
        expect(document.activeElement).toBe(inputs[3]);

        // Only the last group's popover should be open
        const groups = fixture.componentInstance.groups.toArray();
        expect(groups[0]._popover.isOpen()).toBe(false);
        expect(groups[1]._popover.isOpen()).toBe(false);
        expect(groups[2]._popover.isOpen()).toBe(false);
        expect(groups[3]._popover.isOpen()).toBe(true);
    }));

    it('should handle non-sequential focus jumps (input-a → input-d)', fakeAsync(() => {
        const inputA: HTMLInputElement = hostEl.querySelector('#input-a')!;
        const inputD: HTMLInputElement = hostEl.querySelector('#input-d')!;

        // Focus input-a
        inputA.focus();
        inputA.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const groups = fixture.componentInstance.groups.toArray();
        expect(groups[0]._popover.isOpen()).toBe(true);

        // Jump directly to input-d (skipping b and c)
        inputA.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: inputD }));
        fixture.detectChanges();
        tick();

        inputD.focus();
        inputD.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: inputA }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(document.activeElement).toBe(inputD);
        expect(groups[0]._popover.isOpen()).toBe(false);
        expect(groups[3]._popover.isOpen()).toBe(true);
    }));

    it('should handle reverse focus navigation (input-d → input-a)', fakeAsync(() => {
        const inputA: HTMLInputElement = hostEl.querySelector('#input-a')!;
        const inputD: HTMLInputElement = hostEl.querySelector('#input-d')!;

        // Start at input-d
        inputD.focus();
        inputD.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const groups = fixture.componentInstance.groups.toArray();
        expect(groups[3]._popover.isOpen()).toBe(true);

        // Move to input-a (reverse direction)
        inputD.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: inputA }));
        fixture.detectChanges();
        tick();

        inputA.focus();
        inputA.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: inputD }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(document.activeElement).toBe(inputA);
        expect(groups[3]._popover.isOpen()).toBe(false);
        expect(groups[0]._popover.isOpen()).toBe(true);
    }));
});

describe('FormInputMessageGroupComponent — placementContainer: self', () => {
    let fixture: ComponentFixture<SelfContainerGroupsTestComponent>;
    let hostEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SelfContainerGroupsTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelfContainerGroupsTestComponent);
        fixture.detectChanges();
        hostEl = fixture.nativeElement;
    });

    it('should transfer focus correctly when using placementContainer=self', fakeAsync(() => {
        const input1: HTMLInputElement = hostEl.querySelector('#input-self-1')!;
        const input2: HTMLInputElement = hostEl.querySelector('#input-self-2')!;

        // Focus input1
        input1.focus();
        input1.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(document.activeElement).toBe(input1);
        expect(fixture.componentInstance.group1._popover.isOpen()).toBe(true);

        // Transfer to input2
        input1.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: input2 }));
        fixture.detectChanges();
        tick();

        input2.focus();
        input2.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: input1 }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(document.activeElement).toBe(input2);
        expect(fixture.componentInstance.group1._popover.isOpen()).toBe(false);
        expect(fixture.componentInstance.group2._popover.isOpen()).toBe(true);
    }));

    it('should not trap focus when popover message is rendered inline (self container)', fakeAsync(() => {
        const input1: HTMLInputElement = hostEl.querySelector('#input-self-1')!;
        const input2: HTMLInputElement = hostEl.querySelector('#input-self-2')!;

        // Open popover on input1
        input1.focus();
        input1.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        // Verify popover is open and focus is still on input1 (not trapped inside popover)
        expect(fixture.componentInstance.group1._popover.isOpen()).toBe(true);
        expect(document.activeElement).toBe(input1);

        // Now click input2 — focus should transfer cleanly
        input1.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: input2 }));
        input2.focus();
        input2.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: input1 }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(document.activeElement).toBe(input2);
    }));
});
