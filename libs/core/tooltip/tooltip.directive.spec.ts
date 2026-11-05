import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TOOLTIP_CONFIG } from './tooltip.config';
import { TooltipDirective } from './tooltip.directive';

const getTooltip = (): HTMLElement | null => document.body.querySelector('[role="tooltip"]');

const getDescriptionElement = (id: string): HTMLElement | null => document.getElementById(id);

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

const pressEnter = (element: HTMLElement): void => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
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

@Component({
    template: `
        <button
            #host
            type="button"
            aria-label="Warnings"
            [fdTooltip]="warningTemplate"
            fdTooltipBodyClass="custom-tooltip-body"
        ></button>
        <ng-template #warningTemplate><b>3 warnings</b> to review</ng-template>
    `,
    imports: [TooltipDirective]
})
class TooltipTemplateTestComponent {
    readonly host = viewChild.required('host', { read: ElementRef });
}

@Component({
    template: `
        <button
            #info
            type="button"
            aria-label="More information"
            fdTooltip="Changes are saved automatically"
            fdTooltipTrigger="click"
        ></button>
        <button #other type="button">Other</button>
    `,
    imports: [TooltipDirective]
})
class TooltipClickTestComponent {
    readonly info = viewChild.required('info', { read: ElementRef });
    readonly other = viewChild.required('other', { read: ElementRef });
}

@Component({
    template: `
        <button
            #host
            type="button"
            [fdTooltip]="content()"
            [fdTooltipPlacement]="placement()"
            [fdTooltipAlignment]="alignment()"
        >
            Dynamic
        </button>
    `,
    imports: [TooltipDirective]
})
class TooltipPlacementTestComponent {
    readonly host = viewChild.required('host', { read: ElementRef });
    readonly content = signal('Tooltip content');
    readonly placement = signal<'top' | 'bottom' | 'left' | 'right'>('top');
    readonly alignment = signal<'start' | 'middle' | 'end'>('middle');
}

@Component({
    template: ` <button #programmatic type="button" fdTooltip="Programmatic control">Show</button> `,
    imports: [TooltipDirective]
})
class TooltipProgrammaticTestComponent {
    readonly programmatic = viewChild.required('programmatic', { read: ElementRef });
    readonly programmaticDirective = viewChild.required(TooltipDirective);
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

    it('should hide immediately when Enter is pressed on the host', fakeAsync(() => {
        hover(save);
        tick(500);
        expect(getTooltip()).not.toBeNull();

        pressEnter(save);
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

    it('should cancel long-press on touchmove', fakeAsync(() => {
        remove.dispatchEvent(new Event('touchstart'));
        tick(250);
        remove.dispatchEvent(new Event('touchmove'));
        tick(250);
        expect(getTooltip()).toBeNull();
    }));

    it('should cancel long-press on touchend', fakeAsync(() => {
        remove.dispatchEvent(new Event('touchstart'));
        tick(250);
        remove.dispatchEvent(new Event('touchend'));
        tick(250);
        expect(getTooltip()).toBeNull();
    }));

    it('should cancel long-press on touchcancel', fakeAsync(() => {
        remove.dispatchEvent(new Event('touchstart'));
        tick(250);
        remove.dispatchEvent(new Event('touchcancel'));
        tick(250);
        expect(getTooltip()).toBeNull();
    }));

    it('should describe the host only when the tooltip adds information to its accessible name', () => {
        const saveDescriptionId = save.getAttribute('aria-describedby') ?? '';
        const saveDescription = getDescriptionElement(saveDescriptionId);
        expect(saveDescription?.textContent).toBe('Save document');
        expect(saveDescription?.hasAttribute('hidden')).toBe(true);
        expect(save.getAttribute('aria-keyshortcuts')).toBe('Control+S');

        const removeIds = (remove.getAttribute('aria-describedby') ?? '').split(' ');
        expect(removeIds[0]).toBe('external-hint');
        const removeDescription = getDescriptionElement(removeIds[1]);
        expect(removeDescription?.textContent).toBe('Delete the selected item');
        expect(removeDescription?.hasAttribute('hidden')).toBe(true);
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

    it('should clean up description element and ARIA attributes on destroy', () => {
        const descriptionId = save.getAttribute('aria-describedby') ?? '';
        expect(getDescriptionElement(descriptionId)).not.toBeNull();
        expect(save.getAttribute('aria-keyshortcuts')).toBe('Control+S');

        fixture.destroy();

        expect(getDescriptionElement(descriptionId)).toBeNull();
    });

    it('should preserve external aria-describedby ids when enabled or disabled', fakeAsync(() => {
        const initialIds = remove.getAttribute('aria-describedby') ?? '';
        expect(initialIds).toContain('external-hint');

        hover(remove);
        tick(500);
        const withTooltip = remove.getAttribute('aria-describedby') ?? '';
        expect(withTooltip).toContain('external-hint');
        expect(withTooltip.split(' ').length).toBeGreaterThan(1);

        leave(remove);
        tick(500);
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

describe('TooltipDirective with a template', () => {
    let host: HTMLButtonElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [TooltipTemplateTestComponent] });
        const fixture = TestBed.createComponent(TooltipTemplateTestComponent);
        fixture.detectChanges();
        host = fixture.componentInstance.host().nativeElement;
    });

    it('should render the template with the custom body class', fakeAsync(() => {
        hover(host);
        tick(500);

        const tooltip = getTooltip() as HTMLElement;
        expect(tooltip.querySelector('b')?.textContent).toBe('3 warnings');
        expect(tooltip.classList).toContain('fd-popover__body--tooltip');
        expect(tooltip.classList).toContain('custom-tooltip-body');

        leave(host);
        tick(500);
    }));

    it('should describe the host with the rendered template content', () => {
        const descriptionId = host.getAttribute('aria-describedby') ?? '';
        const description = getDescriptionElement(descriptionId);
        expect(description?.textContent).toBe('3 warnings to review');
        expect(description?.hasAttribute('hidden')).toBe(true);
        expect(description?.querySelector('b')?.textContent).toBe('3 warnings');
    });
});

describe('TooltipDirective with the click trigger', () => {
    let info: HTMLButtonElement;
    let other: HTMLButtonElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [TooltipClickTestComponent] });
        const fixture = TestBed.createComponent(TooltipClickTestComponent);
        fixture.detectChanges();
        info = fixture.componentInstance.info().nativeElement;
        other = fixture.componentInstance.other().nativeElement;
    });

    it('should toggle immediately on click and ignore hover', fakeAsync(() => {
        hover(info);
        tick(500);
        expect(getTooltip()).toBeNull();

        info.click();
        expect(getTooltip()?.textContent?.trim()).toBe('Changes are saved automatically');

        leave(info);
        tick(1000);
        expect(getTooltip()).not.toBeNull();

        info.click();
        expect(getTooltip()).toBeNull();
    }));

    it('should hide when focus moves to another element', fakeAsync(() => {
        info.focus();
        info.click();
        expect(getTooltip()).not.toBeNull();

        other.focus();
        expect(getTooltip()).toBeNull();
    }));

    it('should keep the tooltip open when clicking inside it for text selection', fakeAsync(() => {
        info.click();
        expect(getTooltip()).not.toBeNull();

        const tooltip = getTooltip() as HTMLElement;
        tooltip.click();
        tick(100);
        expect(getTooltip()).not.toBeNull();
    }));
});

describe('TooltipDirective with dynamic placement and alignment', () => {
    let fixture: ComponentFixture<TooltipPlacementTestComponent>;
    let component: TooltipPlacementTestComponent;
    let host: HTMLButtonElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [TooltipPlacementTestComponent] });
        fixture = TestBed.createComponent(TooltipPlacementTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        host = component.host().nativeElement;
    });

    it('should update tooltip content reactively', fakeAsync(() => {
        hover(host);
        tick(500);
        expect(getTooltip()?.textContent?.trim()).toBe('Tooltip content');

        component.content.set('Updated content');
        fixture.detectChanges();
        expect(getTooltip()?.textContent?.trim()).toBe('Updated content');

        leave(host);
        tick(500);
    }));

    it('should support all placement options', fakeAsync(() => {
        const placements: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'bottom', 'left', 'right'];

        placements.forEach((placement) => {
            component.placement.set(placement);
            fixture.detectChanges();

            hover(host);
            tick(500);
            expect(getTooltip()).not.toBeNull();

            leave(host);
            tick(500);
        });
    }));

    it('should support all alignment options', fakeAsync(() => {
        const alignments: Array<'start' | 'middle' | 'end'> = ['start', 'middle', 'end'];

        alignments.forEach((alignment) => {
            component.alignment.set(alignment);
            fixture.detectChanges();

            hover(host);
            tick(500);
            expect(getTooltip()).not.toBeNull();

            leave(host);
            tick(500);
        });
    }));

    it('should hide the tooltip when content becomes empty', fakeAsync(() => {
        hover(host);
        tick(500);
        expect(getTooltip()).not.toBeNull();

        component.content.set('');
        fixture.detectChanges();
        expect(getTooltip()).toBeNull();
    }));
});

describe('TooltipDirective programmatic control', () => {
    let fixture: ComponentFixture<TooltipProgrammaticTestComponent>;
    let component: TooltipProgrammaticTestComponent;
    let directive: TooltipDirective;
    let host: HTMLButtonElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [TooltipProgrammaticTestComponent] });
        fixture = TestBed.createComponent(TooltipProgrammaticTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directive = component.programmaticDirective();
        host = component.programmatic().nativeElement;
    });

    it('should show the tooltip immediately with show()', fakeAsync(() => {
        directive.show();
        tick(1);
        expect(getTooltip()?.textContent?.trim()).toBe('Programmatic control');

        directive.hide();
        tick(1);
        expect(getTooltip()).toBeNull();
    }));

    it('should hide a pending show with hide()', fakeAsync(() => {
        hover(host);
        tick(100);
        expect(getTooltip()).toBeNull();

        directive.hide();
        tick(500);
        expect(getTooltip()).toBeNull();
    }));

    it('should expose the tooltip id for external references', () => {
        expect(directive.tooltipId).toMatch(/^fd-tooltip-\d+$/);
    });

    it('should set host size CSS variables on the tooltip body', fakeAsync(() => {
        directive.show();
        tick(1);

        const body = document.body.querySelector('fd-popover-body') as HTMLElement;
        expect(body).not.toBeNull();

        const style = body.getAttribute('style') ?? '';
        expect(style).toContain('--fdTooltip_Host_Width');
        expect(style).toContain('--fdTooltip_Host_Height');
        expect(style).toMatch(/--fdTooltip_Host_Width:\s*\d+(\.\d+)?px/);
        expect(style).toMatch(/--fdTooltip_Host_Height:\s*\d+(\.\d+)?px/);

        directive.hide();
        tick(1);
    }));
});
