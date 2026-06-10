import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { InputMessageGroupWithTemplate } from './input-message-group-with-template.component';

// ─── Test host components ────────────────────────────────────────────────────

@Component({
    template: `
        <fdp-input-message-group #group>
            <ng-template #triggerItem>
                <input id="group-input" />
            </ng-template>
            <span>Error message</span>
        </fdp-input-message-group>
        <input id="external-input" />
    `,
    imports: [InputMessageGroupWithTemplate]
})
class SingleGroupHostComponent {
    @ViewChild('group') group: InputMessageGroupWithTemplate;
}

@Component({
    template: `
        <fdp-input-message-group #group1>
            <ng-template #triggerItem>
                <input id="input-a" />
            </ng-template>
            <span>Error A</span>
        </fdp-input-message-group>
        <fdp-input-message-group #group2>
            <ng-template #triggerItem>
                <input id="input-b" />
            </ng-template>
            <span>Error B</span>
        </fdp-input-message-group>
    `,
    imports: [InputMessageGroupWithTemplate]
})
class TwoGroupsHostComponent {
    @ViewChild('group1') group1: InputMessageGroupWithTemplate;
    @ViewChild('group2') group2: InputMessageGroupWithTemplate;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function focusin(el: HTMLElement, relatedTarget?: HTMLElement): void {
    el.focus();
    el.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: relatedTarget ?? null }));
}

function focusout(el: HTMLElement, relatedTarget?: HTMLElement): void {
    el.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: relatedTarget ?? null }));
}

// ─── Suites ──────────────────────────────────────────────────────────────────

describe('InputMessageGroupWithTemplate', () => {
    let fixture: ComponentFixture<SingleGroupHostComponent>;
    let host: SingleGroupHostComponent;
    let groupInput: HTMLInputElement;
    let externalInput: HTMLInputElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SingleGroupHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleGroupHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        groupInput = fixture.nativeElement.querySelector('#group-input');
        externalInput = fixture.nativeElement.querySelector('#external-input');
    });

    it('should create', () => {
        expect(host.group).toBeTruthy();
    });

    it('should render the trigger template content', () => {
        expect(groupInput).toBeTruthy();
    });

    it('should have popover closed initially', () => {
        expect(host.group._popover.isOpen()).toBe(false);
    });

    it('should open the popover on focusin', fakeAsync(() => {
        focusin(groupInput);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(host.group._popover.isOpen()).toBe(true);
    }));

    it('should close the popover on focusout', fakeAsync(() => {
        focusin(groupInput);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        focusout(groupInput);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(host.group._popover.isOpen()).toBe(false);
    }));

    it('should emit isOpenChange when popover opens and closes', fakeAsync(() => {
        const emitted: boolean[] = [];
        host.group.isOpenChange.subscribe((v) => emitted.push(v));

        focusin(groupInput);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        focusout(groupInput);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(emitted).toEqual([true, false]);
    }));

    it('should default closeOnOutsideClick to false', () => {
        expect(host.group.closeOnOutsideClick).toBe(false);
    });

    it('should accept custom triggers via input', () => {
        host.group.triggers = ['click'];
        fixture.detectChanges();
        expect(host.group.triggers).toEqual(['click']);
    });

    describe('focus restoration regression (double-click-to-lose-focus bug)', () => {
        it('should not steal focus back to the input after focusout closes the popover', fakeAsync(() => {
            // Open the popover by focusing the group input
            focusin(groupInput);
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(host.group._popover.isOpen()).toBe(true);
            expect(document.activeElement).toBe(groupInput);

            // Simulate user clicking the external input — browser moves focus there
            externalInput.focus();
            expect(document.activeElement).toBe(externalInput);

            // Focusout on group input triggers popover close.
            // Before the fix, the popover service would call _lastActiveElement.focus()
            // (restoring focus to groupInput) because focusAutoCapture defaulted to true.
            focusout(groupInput, externalInput);
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(host.group._popover.isOpen()).toBe(false);
            expect(document.activeElement).toBe(externalInput);
        }));

        it('should leave focus on the external element even when the popover body had content', fakeAsync(() => {
            focusin(groupInput);
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            // Confirm the popover body content is present while open
            const bodyContent = document.querySelector('.fd-popover__body--input-message-group');
            expect(bodyContent).toBeTruthy();

            externalInput.focus();
            focusout(groupInput, externalInput);
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(document.activeElement).toBe(externalInput);
        }));
    });
});

describe('InputMessageGroupWithTemplate — focus transfer between two groups', () => {
    let fixture: ComponentFixture<TwoGroupsHostComponent>;
    let host: TwoGroupsHostComponent;
    let inputA: HTMLInputElement;
    let inputB: HTMLInputElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TwoGroupsHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TwoGroupsHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        inputA = fixture.nativeElement.querySelector('#input-a');
        inputB = fixture.nativeElement.querySelector('#input-b');
    });

    it('should transfer focus to the second input on a single click without requiring a double-click', fakeAsync(() => {
        // Focus group 1
        focusin(inputA);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(host.group1._popover.isOpen()).toBe(true);
        expect(document.activeElement).toBe(inputA);

        // Move to group 2: browser fires focusout on A, then focusin on B
        inputB.focus();
        focusout(inputA, inputB);
        fixture.detectChanges();
        tick();

        focusin(inputB, inputA);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        // After a single click, focus must be on inputB — not stolen back to inputA
        expect(document.activeElement).toBe(inputB);
        expect(host.group1._popover.isOpen()).toBe(false);
        expect(host.group2._popover.isOpen()).toBe(true);
    }));

    it('should close group 1 popover and open group 2 popover when focus moves between groups', fakeAsync(() => {
        focusin(inputA);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(host.group1._popover.isOpen()).toBe(true);
        expect(host.group2._popover.isOpen()).toBe(false);

        focusout(inputA, inputB);
        inputB.focus();
        focusin(inputB, inputA);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(host.group1._popover.isOpen()).toBe(false);
        expect(host.group2._popover.isOpen()).toBe(true);
    }));

    it('should handle reverse focus navigation (group 2 → group 1)', fakeAsync(() => {
        focusin(inputB);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(host.group2._popover.isOpen()).toBe(true);

        focusout(inputB, inputA);
        inputA.focus();
        focusin(inputA, inputB);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(document.activeElement).toBe(inputA);
        expect(host.group2._popover.isOpen()).toBe(false);
        expect(host.group1._popover.isOpen()).toBe(true);
    }));
});

describe('InputMessageGroupWithTemplate — popover aria-label (#14260)', () => {
    let fixture: ComponentFixture<SingleGroupHostComponent>;
    let groupInput: HTMLInputElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SingleGroupHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleGroupHostComponent);
        fixture.detectChanges();
        groupInput = fixture.nativeElement.querySelector('#group-input');
    });

    it('renders the popover body with a non-empty aria-label', fakeAsync(() => {
        focusin(groupInput);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const body = document.querySelector('.cdk-overlay-container .fd-popover__body');
        expect(body?.getAttribute('role')).toBe('dialog');
        const label = body?.getAttribute('aria-label');
        expect(label).toBeTruthy();
        expect(label?.length).toBeGreaterThan(0);
    }));
});
