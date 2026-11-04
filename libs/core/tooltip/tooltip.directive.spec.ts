import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TOOLTIP_CONFIG } from './tooltip.config';
import { TooltipDirective } from './tooltip.directive';

const getTooltip = (): HTMLElement | null => document.body.querySelector('[role="tooltip"]');

const hover = (element: Element): void => {
    element.dispatchEvent(new MouseEvent('pointerenter'));
};

const leave = (element: Element): void => {
    element.dispatchEvent(new MouseEvent('pointerleave'));
};

const focusWithKeyboard = (element: HTMLElement): void => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    element.focus();
};

const pressEscape = (element: HTMLElement): void => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
};

@Component({
    template: `
        <div (keydown)="parentKeydown($event)">
            <button
                #save
                type="button"
                aria-label="Save"
                fdTooltip="Save document (Ctrl+S)"
                fdTooltipKeyShortcuts="Control+S"
                [fdTooltipDisabled]="disabled()"
            >
                S
            </button>
            <button #remove type="button" aria-describedby="external-hint" fdTooltip="Delete the selected item">
                Delete
            </button>
            <button #copy type="button" fdTooltip="Copy">Copy</button>
            <a #link href="#" fdTooltip="Open in new tab">Link</a>
        </div>
    `,
    imports: [TooltipDirective]
})
class TooltipTestComponent {
    readonly save = viewChild.required('save', { read: ElementRef });
    readonly remove = viewChild.required('remove', { read: ElementRef });
    readonly copy = viewChild.required('copy', { read: ElementRef });
    readonly link = viewChild.required('link', { read: ElementRef });
    readonly disabled = signal(false);
    readonly parentKeydown = jest.fn();
}

@Component({
    template: `
        <button #configured type="button" fdTooltip="Configured delay">Configured</button>
        <button #overridden type="button" fdTooltip="Input delay" [fdTooltipShowDelay]="300">Overridden</button>
    `,
    imports: [TooltipDirective]
})
class TooltipDelayTestComponent {
    readonly configured = viewChild.required('configured', { read: ElementRef });
    readonly overridden = viewChild.required('overridden', { read: ElementRef });
}

describe('TooltipDirective', () => {
    let fixture: ComponentFixture<TooltipTestComponent>;
    let component: TooltipTestComponent;
    let save: HTMLButtonElement;
    let remove: HTMLButtonElement;
    let copy: HTMLButtonElement;
    let link: HTMLAnchorElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [TooltipTestComponent] });
        fixture = TestBed.createComponent(TooltipTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        save = component.save().nativeElement;
        remove = component.remove().nativeElement;
        copy = component.copy().nativeElement;
        link = component.link().nativeElement;
    });

    it('should show after the show delay on hover and hide after the hide delay on leave', fakeAsync(() => {
        hover(save);
        tick(499);
        expect(getTooltip()).toBeNull();
        tick(1);
        expect(getTooltip()?.textContent?.trim()).toBe('Save document (Ctrl+S)');

        leave(save);
        tick(499);
        expect(getTooltip()).not.toBeNull();
        tick(1);
        expect(getTooltip()).toBeNull();
    }));

    it('should render a non-focusable container with role="tooltip" and a unique id', fakeAsync(() => {
        hover(save);
        tick(500);

        const tooltip = getTooltip() as HTMLElement;
        expect(tooltip.id).toMatch(/^fd-tooltip-\d+$/);
        expect(tooltip.hasAttribute('tabindex')).toBe(false);
        expect(tooltip.classList).toContain('fd-popover__body--tooltip');

        leave(save);
        tick(500);
    }));

    it('should stay open while the pointer is over the tooltip', fakeAsync(() => {
        hover(save);
        tick(500);
        leave(save);
        const body = document.body.querySelector('fd-popover-body') as HTMLElement;
        hover(body);
        tick(1000);
        expect(getTooltip()).not.toBeNull();

        leave(body);
        tick(500);
        expect(getTooltip()).toBeNull();
    }));

    it('should show on keyboard focus but not on pointer focus', fakeAsync(() => {
        document.dispatchEvent(new MouseEvent('mousedown', { buttons: 1, detail: 1 }));
        remove.focus();
        tick(500);
        expect(getTooltip()).toBeNull();
        remove.blur();

        focusWithKeyboard(remove);
        tick(500);
        expect(getTooltip()).not.toBeNull();

        remove.blur();
        tick(500);
        expect(getTooltip()).toBeNull();
    }));

    it('should close the open tooltip immediately and show the next one after the sequence delay', fakeAsync(() => {
        hover(save);
        tick(500);

        leave(save);
        hover(remove);
        expect(getTooltip()).toBeNull();
        tick(199);
        expect(getTooltip()).toBeNull();
        tick(1);
        expect(document.body.querySelectorAll('[role="tooltip"]').length).toBe(1);
        expect(getTooltip()?.textContent?.trim()).toBe('Delete the selected item');

        leave(remove);
        tick(500);
    }));

    it('should consume the first Escape to close the tooltip and let the second one through', fakeAsync(() => {
        hover(save);
        tick(500);

        pressEscape(save);
        expect(getTooltip()).toBeNull();
        expect(component.parentKeydown).not.toHaveBeenCalled();

        pressEscape(save);
        expect(component.parentKeydown).toHaveBeenCalledTimes(1);
    }));

    it('should hide immediately when the host is activated or the user clicks elsewhere', fakeAsync(() => {
        hover(remove);
        tick(500);
        remove.click();
        expect(getTooltip()).toBeNull();

        hover(copy);
        tick(500);
        document.body.click();
        expect(getTooltip()).toBeNull();
    }));

    it('should hide on window blur and not restore when the window is focused again', fakeAsync(() => {
        focusWithKeyboard(remove);
        tick(500);
        expect(getTooltip()).not.toBeNull();

        window.dispatchEvent(new Event('blur'));
        expect(getTooltip()).toBeNull();

        window.dispatchEvent(new Event('focus'));
        remove.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        tick(500);
        expect(getTooltip()).toBeNull();
    }));

    it('should toggle immediately with Ctrl+Alt+I', fakeAsync(() => {
        const shortcut = (): boolean =>
            copy.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyI', ctrlKey: true, altKey: true }));

        shortcut();
        expect(getTooltip()).not.toBeNull();
        shortcut();
        expect(getTooltip()).toBeNull();
    }));

    it('should show on long-press, except on links', fakeAsync(() => {
        remove.dispatchEvent(new Event('touchstart'));
        tick(500);
        expect(getTooltip()).not.toBeNull();
        document.body.click();

        link.dispatchEvent(new Event('touchstart'));
        tick(500);
        expect(getTooltip()).toBeNull();
    }));

    it('should describe the host only when the tooltip adds information to its accessible name', () => {
        const saveDescriptionId = save.getAttribute('aria-describedby') ?? '';
        expect(document.getElementById(saveDescriptionId)?.textContent).toBe('Save document');
        expect(save.getAttribute('aria-keyshortcuts')).toBe('Control+S');

        const removeIds = (remove.getAttribute('aria-describedby') ?? '').split(' ');
        expect(removeIds[0]).toBe('external-hint');
        expect(document.getElementById(removeIds[1])?.textContent).toBe('Delete the selected item');
        expect(remove.childElementCount).toBe(0);

        expect(copy.hasAttribute('aria-describedby')).toBe(false);
    });

    it('should not touch the host or show when disabled', fakeAsync(() => {
        component.disabled.set(true);
        fixture.detectChanges();

        expect(save.hasAttribute('aria-describedby')).toBe(false);
        expect(save.hasAttribute('aria-keyshortcuts')).toBe(false);

        hover(save);
        tick(500);
        expect(getTooltip()).toBeNull();
    }));
});

describe('TooltipDirective delays', () => {
    let configured: HTMLButtonElement;
    let overridden: HTMLButtonElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TooltipDelayTestComponent],
            providers: [{ provide: TOOLTIP_CONFIG, useValue: { showDelay: 100 } }]
        });
        const fixture = TestBed.createComponent(TooltipDelayTestComponent);
        fixture.detectChanges();
        configured = fixture.componentInstance.configured().nativeElement;
        overridden = fixture.componentInstance.overridden().nativeElement;
    });

    it('should use the configured delay and let the input override it', fakeAsync(() => {
        hover(configured);
        tick(100);
        expect(getTooltip()?.textContent?.trim()).toBe('Configured delay');
        leave(configured);
        tick(500);

        hover(overridden);
        tick(299);
        expect(getTooltip()).toBeNull();
        tick(1);
        expect(getTooltip()?.textContent?.trim()).toBe('Input delay');
        leave(overridden);
        tick(500);
    }));
});
