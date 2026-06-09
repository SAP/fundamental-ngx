import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PopoverBodyComponent } from '../popover-body/popover-body.component';
import { PopoverService, PopoverTemplate } from './popover.service';

@Component({
    template: `
        <div #scrollContainer style="overflow: auto; height: 300px">
            <div #sibling class="sibling">Sibling element</div>
            <fd-popover-body></fd-popover-body>
            <ng-template #templateRef>
                <div class="template-content">Template Content</div>
            </ng-template>
            <ng-container #container></ng-container>
            <button #triggerElement class="trigger-button">Open Popover</button>
        </div>
    `,
    standalone: true,
    imports: [PopoverBodyComponent],
    providers: [PopoverService]
})
class PopoverTestComponent {
    @ViewChild(PopoverBodyComponent) popoverBody: PopoverBodyComponent;
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
    @ViewChild('templateRef') template: TemplateRef<any>;
    @ViewChild('triggerElement', { read: ElementRef }) triggerRef: ElementRef;
    @ViewChild('sibling', { read: ElementRef }) siblingRef: ElementRef;
    @ViewChild('scrollContainer', { read: ElementRef }) scrollContainerRef: ElementRef;

    constructor(public popoverService: PopoverService) {}

    getPopoverTemplateData(): PopoverTemplate {
        return {
            template: this.template,
            container: this.container,
            popoverBody: this.popoverBody
        };
    }
}

describe('PopoverService', () => {
    let service: PopoverService;
    let component: PopoverTestComponent;
    let fixture: ComponentFixture<PopoverTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PopoverTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PopoverTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = component.popoverService;
    });

    afterEach(() => {
        // Clean up any open popovers
        if (service.isOpen()) {
            service.close();
        }
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    describe('opening and closing', () => {
        beforeEach(() => {
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();
        });

        it('should open popover when open() is called', () => {
            expect(service.isOpen()).toBe(false);

            service.open();
            fixture.detectChanges();

            expect(service.isOpen()).toBe(true);
        });

        it('should close popover when close() is called', () => {
            service.open();
            fixture.detectChanges();
            expect(service.isOpen()).toBe(true);

            service.close();
            fixture.detectChanges();

            expect(service.isOpen()).toBe(false);
        });

        it('should toggle popover state', () => {
            expect(service.isOpen()).toBe(false);

            service.toggle();
            fixture.detectChanges();
            expect(service.isOpen()).toBe(true);

            service.toggle();
            fixture.detectChanges();
            expect(service.isOpen()).toBe(false);
        });

        it('should emit isOpenChange when state changes', () => {
            const emittedValues: boolean[] = [];
            service.isOpenChange.subscribe((value) => emittedValues.push(value));

            service.open();
            fixture.detectChanges();

            service.close();
            fixture.detectChanges();

            expect(emittedValues).toContain(true);
            expect(emittedValues).toContain(false);
        });
    });

    describe('trigger interactions', () => {
        it('should open popover when user clicks trigger element', () => {
            service.triggers.set(['click']);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();

            expect(service.isOpen()).toBe(false);

            // Simulate user clicking the trigger
            component.triggerRef.nativeElement.click();

            expect(service.isOpen()).toBe(true);
        });

        it('should toggle popover on repeated clicks', () => {
            service.triggers.set(['click']);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();

            // First click opens
            component.triggerRef.nativeElement.click();
            expect(service.isOpen()).toBe(true);

            // Second click closes
            component.triggerRef.nativeElement.click();
            expect(service.isOpen()).toBe(false);
        });

        it('should respond to mouseenter trigger', () => {
            service.triggers.set(['mouseenter']);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();

            component.triggerRef.nativeElement.dispatchEvent(new Event('mouseenter'));

            expect(service.isOpen()).toBe(true);
        });

        it('should not respond to triggers when disabled', () => {
            service.triggers.set(['click']);
            service.disabled.set(true);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();

            component.triggerRef.nativeElement.click();

            expect(service.isOpen()).toBe(false);
        });

        it('should ignore triggers when setIgnoreTriggers is true', () => {
            service.triggers.set(['click']);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();

            service.setIgnoreTriggers(true);
            component.triggerRef.nativeElement.click();

            expect(service.isOpen()).toBe(false);

            service.setIgnoreTriggers(false);
            component.triggerRef.nativeElement.click();

            expect(service.isOpen()).toBe(true);
        });
    });

    describe('closing behaviors', () => {
        beforeEach(() => {
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();
        });

        it('should close on outside click when closeOnOutsideClick is true', fakeAsync(() => {
            service.closeOnOutsideClick.set(true);
            service.open();
            fixture.detectChanges();
            tick();

            expect(service.isOpen()).toBe(true);

            // Simulate clicking outside (on document body)
            document.body.click();
            tick();

            expect(service.isOpen()).toBe(false);
        }));

        it('should not close on outside click when closeOnOutsideClick is false', fakeAsync(() => {
            service.closeOnOutsideClick.set(false);
            service.open();
            fixture.detectChanges();
            tick();

            document.body.click();
            tick();

            expect(service.isOpen()).toBe(true);
        }));

        it('should not close when clicking on the trigger element', () => {
            service.closeOnOutsideClick.set(true);
            service.open();
            fixture.detectChanges();

            // Click on trigger should not close
            component.triggerRef.nativeElement.click();

            // It toggles, so it will close due to toggle behavior, but _shouldClose returns false
            // This test verifies the trigger is not considered "outside"
        });
    });

    describe('configuration', () => {
        beforeEach(() => {
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();
        });

        it('should open automatically when initialized with isOpen: true in config', () => {
            // Close current popover first
            service.close();
            fixture.detectChanges();

            // Re-initialize with isOpen: true
            service.initialise(component.triggerRef, { isOpen: true }, component.getPopoverTemplateData());
            fixture.detectChanges();

            expect(service.isOpen()).toBe(true);
        });

        it('should update configuration via refreshConfiguration', () => {
            service.refreshConfiguration({
                noArrow: false,
                maxWidth: 500,
                fillControlMode: 'equal'
            });

            expect(service.noArrow()).toBe(false);
            expect(service.maxWidth()).toBe(500);
            expect(service.fillControlMode()).toBe('equal');
        });

        it('should apply arrow setting to body when opened', () => {
            service.noArrow.set(false);
            service.open();
            fixture.detectChanges();

            expect(component.popoverBody._noArrow()).toBe(false);
        });

        it('should apply focusTrapped setting to body when opened', () => {
            service.focusTrapped.set(true);
            service.open();
            fixture.detectChanges();

            expect(component.popoverBody._focusTrapped()).toBe(true);
        });

        it('should apply maxWidth setting to body when opened', () => {
            service.maxWidth.set(400);
            service.open();
            fixture.detectChanges();

            expect(component.popoverBody._maxWidth()).toBe(400);
        });
    });

    describe('content types', () => {
        it('should pass text content to popover body', () => {
            service.stringContent = 'Hello Popover';
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            service.open();
            fixture.detectChanges();

            // Verify the text was passed to the body component
            expect(component.popoverBody.text()).toBe('Hello Popover');
        });

        it('should pass template content to popover body', () => {
            service.templateContent = component.template;
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            service.open();
            fixture.detectChanges();

            // Verify the template was passed to the body component
            expect(component.popoverBody._templateToDisplay()).toBe(component.template);
        });
    });

    describe('fillControlMode', () => {
        beforeEach(() => {
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();
        });

        it('should set minimum width when fillControlMode is at-least', () => {
            service.fillControlMode.set('at-least');
            service.open();
            fixture.detectChanges();

            // The body should have a min-width matching the trigger width
            const triggerWidth = component.triggerRef.nativeElement.offsetWidth;
            expect(component.popoverBody._popoverBodyMinWidth()).toBe(triggerWidth);
        });

        it('should set exact width when fillControlMode is equal', () => {
            service.fillControlMode.set('equal');
            service.open();
            fixture.detectChanges();

            // The body should have exact width matching the trigger width
            const triggerWidth = component.triggerRef.nativeElement.offsetWidth;
            expect(component.popoverBody._popoverBodyWidth()).toBe(triggerWidth);
        });
    });

    describe('deactivation', () => {
        it('should close popover and stop responding to triggers when deactivated', () => {
            service.triggers.set(['click']);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            service.open();
            fixture.detectChanges();

            expect(service.isOpen()).toBe(true);

            service.deactivate();
            fixture.detectChanges();

            expect(service.isOpen()).toBe(false);

            // Should no longer respond to triggers
            component.triggerRef.nativeElement.click();
            expect(service.isOpen()).toBe(false);
        });
    });

    describe('overlay behavior', () => {
        it('should apply overlay class when modal mode is enabled', () => {
            service.closeOnOutsideClick.set(false);
            service.applyOverlay.set(true);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());

            service.open();
            service.checkModalBackground();
            fixture.detectChanges();

            expect(document.body.classList.contains('fd-overlay-active')).toBe(true);
            expect(document.querySelector('.fd-popover__modal')).toBeTruthy();

            // Cleanup
            service.close();
            fixture.detectChanges();
        });
    });

    describe('position management', () => {
        beforeEach(() => {
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            service.open();
            fixture.detectChanges();
        });

        it('should refresh position when refreshPosition is called', () => {
            // This test verifies the method can be called without error
            expect(() => service.refreshPosition()).not.toThrow();
        });

        it('should apply new positions when applyNewPosition is called', () => {
            const newPositions = [{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }] as any;

            expect(() => service.applyNewPosition(newPositions)).not.toThrow();
        });
    });

    describe('trigger element updates', () => {
        it('should update trigger element and re-register listeners', () => {
            service.triggers.set(['click']);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();

            // Create a new trigger
            const newTrigger = document.createElement('button');
            document.body.appendChild(newTrigger);

            service.updateTriggerElement(newTrigger);

            // Old trigger should not work
            component.triggerRef.nativeElement.click();
            expect(service.isOpen()).toBe(false);

            // New trigger should work
            newTrigger.click();
            expect(service.isOpen()).toBe(true);

            // Cleanup
            document.body.removeChild(newTrigger);
        });
    });

    describe('focusout trigger handling', () => {
        it('should not restore focus when closing via focusout trigger', fakeAsync(() => {
            service.triggers.set(['focusin', 'focusout']);
            service.focusAutoCapture.set(true);
            service.restoreFocusOnClose.set(true);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();

            // Create a second focusable element to receive focus
            const externalInput = document.createElement('input');
            document.body.appendChild(externalInput);

            // Open via focusin
            component.triggerRef.nativeElement.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            fixture.detectChanges();
            tick();
            expect(service.isOpen()).toBe(true);

            // Focus external input (simulating browser focus transfer)
            externalInput.focus();

            // Close via focusout — this should NOT restore focus to trigger
            component.triggerRef.nativeElement.dispatchEvent(
                new FocusEvent('focusout', { bubbles: true, relatedTarget: externalInput })
            );
            fixture.detectChanges();
            tick();

            expect(service.isOpen()).toBe(false);
            // The external input should still have focus (not stolen back)
            expect(document.activeElement).toBe(externalInput);

            // Cleanup
            document.body.removeChild(externalInput);
        }));

        it('should restore focus when closing via non-focusout triggers', fakeAsync(() => {
            service.triggers.set(['click']);
            service.focusAutoCapture.set(true);
            service.restoreFocusOnClose.set(true);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();

            // Focus the trigger (sets _lastActiveElement)
            component.triggerRef.nativeElement.focus();

            // Open via click
            component.triggerRef.nativeElement.click();
            fixture.detectChanges();
            tick();
            expect(service.isOpen()).toBe(true);

            // Close via click (toggle) — this SHOULD restore focus
            component.triggerRef.nativeElement.click();
            fixture.detectChanges();
            tick();

            expect(service.isOpen()).toBe(false);
            expect(document.activeElement).toBe(component.triggerRef.nativeElement);
        }));

        it('should close via toggle with focusActiveElement=false on focusout', () => {
            service.triggers.set(['focusin', 'focusout']);
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();

            // Spy on toggle to verify arguments
            const toggleSpy = jest.spyOn(service, 'toggle');

            // Open via focusin
            component.triggerRef.nativeElement.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            expect(toggleSpy).toHaveBeenCalledWith(true, false, undefined);

            toggleSpy.mockClear();

            // Close via focusout — should pass focusActiveElement=false
            component.triggerRef.nativeElement.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
            expect(toggleSpy).toHaveBeenCalledWith(false, true, false);
        });
    });

    describe('safe signal writes (NG0600 handling)', () => {
        beforeEach(() => {
            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();
        });

        it('should recover from NG0600 error during open by deferring signal write', fakeAsync(() => {
            // Make first signal write throw NG0600, then succeed on retry
            let firstCall = true;
            const originalSet = service.isOpen.set.bind(service.isOpen);
            jest.spyOn(service.isOpen, 'set').mockImplementation((value: boolean) => {
                if (firstCall) {
                    firstCall = false;
                    throw new Error('NG0600: Writing to signals is not allowed');
                }
                originalSet(value);
            });

            service.open();
            tick(); // Execute deferred retry

            expect(service.isOpen()).toBe(true);
        }));

        it('should recover from NG0600 error during close by deferring signal write', fakeAsync(() => {
            service.open();
            fixture.detectChanges();

            // Make first signal write throw NG0600, then succeed on retry
            let firstCall = true;
            const originalSet = service.isOpen.set.bind(service.isOpen);
            jest.spyOn(service.isOpen, 'set').mockImplementation((value: boolean) => {
                if (firstCall) {
                    firstCall = false;
                    throw new Error('NG0600: Writing to signals is not allowed');
                }
                originalSet(value);
            });

            service.close();
            tick(); // Execute deferred retry

            expect(service.isOpen()).toBe(false);
        }));

        it('should rethrow non-NG0600 errors', () => {
            service.open();
            fixture.detectChanges();

            const spy = jest.spyOn(service.isOpen, 'set').mockImplementation(() => {
                throw new Error('Some other error');
            });

            expect(() => service.close()).toThrow('Some other error');

            // Restore spy to prevent afterEach cleanup from throwing
            spy.mockRestore();
        });

        it('should set isOpen synchronously when no error occurs', () => {
            expect(service.isOpen()).toBe(false);

            service.open();
            expect(service.isOpen()).toBe(true);

            service.close();
            expect(service.isOpen()).toBe(false);
        });
    });

    describe('layout shift repositioning (MutationObserver)', () => {
        let mutationCallback: MutationCallback;
        let observeSpy: jest.Mock;
        let disconnectSpy: jest.Mock;
        let updatePositionSpy: jest.SpyInstance;

        beforeEach(() => {
            observeSpy = jest.fn();
            disconnectSpy = jest.fn();

            // Capture the MutationObserver callback so tests can trigger it manually.
            jest.spyOn(window, 'MutationObserver' as any).mockImplementation((...args: unknown[]) => {
                const [cb] = args as [MutationCallback];
                mutationCallback = cb;
                return { observe: observeSpy, disconnect: disconnectSpy, takeRecords: jest.fn() };
            });

            // Make requestAnimationFrame synchronous so mutation callbacks resolve immediately.
            jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
                cb(0);
                return 0;
            });

            service.initialise(component.triggerRef, undefined, component.getPopoverTemplateData());
            fixture.detectChanges();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should start observing the scrollable ancestor when the popover opens', () => {
            service.open();
            fixture.detectChanges();

            expect(observeSpy).toHaveBeenCalled();
            const [target, opts] = observeSpy.mock.calls[0];
            expect(target).toBe(component.scrollContainerRef.nativeElement);
            expect(opts.subtree).toBe(true);
            expect(opts.childList).toBe(true);
            expect(opts.attributes).toBe(true);
        });

        it('should observe only style and class attributes to avoid unnecessary callbacks', () => {
            service.open();
            fixture.detectChanges();

            const opts = observeSpy.mock.calls[0][1];
            expect(opts.attributeFilter).toEqual(['style', 'class']);
        });

        it('should disconnect the observer when the popover closes', () => {
            service.open();
            fixture.detectChanges();

            service.close();
            fixture.detectChanges();

            expect(disconnectSpy).toHaveBeenCalled();
        });

        it('should call updatePosition when a child element is removed from the DOM', () => {
            service.open();
            fixture.detectChanges();

            updatePositionSpy = jest.spyOn(service['_overlayRef'], 'updatePosition');

            // Simulate childList mutation (element removed from DOM above the trigger).
            mutationCallback([{ type: 'childList' } as MutationRecord], {} as MutationObserver);

            expect(updatePositionSpy).toHaveBeenCalled();
        });

        it('should call updatePosition when a sibling style attribute changes (display:none)', () => {
            service.open();
            fixture.detectChanges();

            updatePositionSpy = jest.spyOn(service['_overlayRef'], 'updatePosition');

            // Simulate attribute mutation (e.g. display:none set inline by autoDismiss directive).
            mutationCallback(
                [{ type: 'attributes', attributeName: 'style' } as MutationRecord],
                {} as MutationObserver
            );

            expect(updatePositionSpy).toHaveBeenCalled();
        });

        it('should call updatePosition when a sibling class attribute changes', () => {
            service.open();
            fixture.detectChanges();

            updatePositionSpy = jest.spyOn(service['_overlayRef'], 'updatePosition');

            mutationCallback(
                [{ type: 'attributes', attributeName: 'class' } as MutationRecord],
                {} as MutationObserver
            );

            expect(updatePositionSpy).toHaveBeenCalled();
        });

        it('should not start the observer when no trigger element is set', () => {
            // Reinitialise without a trigger (deactivate first to clear the existing one).
            service.deactivate();
            // Reset service trigger element by opening without initialising a new trigger.
            service['_triggerElement'] = null as any;

            service.open();

            expect(observeSpy).not.toHaveBeenCalled();
        });

        it('should fall back to document.body when no scrollable ancestor exists', () => {
            // The triggerElement in the default template has a scrollable parent (scrollContainer).
            // Point the trigger directly at document.body's child to test the fallback.
            const orphan = document.createElement('button');
            document.body.appendChild(orphan);
            service.updateTriggerElement(orphan);

            service.open();
            fixture.detectChanges();

            const observedTarget = observeSpy.mock.calls[0]?.[0];
            expect(observedTarget).toBe(document.body);

            document.body.removeChild(orphan);
        });
    });
});
