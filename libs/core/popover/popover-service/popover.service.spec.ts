import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasePopoverClass } from '../base/base-popover.class';
import { PopoverBodyComponent } from '../popover-body/popover-body.component';
import { PopoverModule } from '../popover.module';
import { PopoverService, PopoverTemplate } from './popover.service';

@Component({
    template: `
        <fd-popover-body></fd-popover-body>
        <ng-template #templateRef></ng-template>
        <ng-container #container></ng-container>
        <div #triggerElement>trigger</div>
    `,
    standalone: true,
    imports: [PopoverModule],
    providers: [PopoverService]
})
class PopoverTestComponent extends BasePopoverClass {
    @ViewChild(PopoverBodyComponent) popoverBody: PopoverBodyComponent;

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    @ViewChild('templateRef') template: TemplateRef<any>;
    @ViewChild('triggerElement', { read: ElementRef }) triggerRef: ElementRef;

    constructor(public popoverService: PopoverService) {
        super();
    }

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
    let componentInstance: PopoverTestComponent;
    let fixture: ComponentFixture<PopoverTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PopoverTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PopoverTestComponent);
        componentInstance = fixture.componentInstance;

        fixture.detectChanges();
        service = componentInstance.popoverService;
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    it('should initialise with prepared popover component', () => {
        jest.spyOn(<any>service, '_refreshTriggerListeners');

        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        fixture.detectChanges();

        expect((<any>service)._templateData).toEqual(componentInstance.getPopoverTemplateData());
        expect((<any>service)._triggerElement).toBe(componentInstance.triggerRef);
        expect((<any>service)._refreshTriggerListeners).toHaveBeenCalled();
    });

    it('should initialise and create popover body only with text', () => {
        const testString = 'teststring';
        jest.spyOn(<any>service, '_refreshTriggerListeners');
        service.stringContent = testString;

        service.initialise(componentInstance.triggerRef, componentInstance);
        fixture.detectChanges();

        service.open();

        fixture.detectChanges();

        expect((<any>service)._triggerElement).toBe(componentInstance.triggerRef);
        expect((<any>service)._popoverBody.text).toBe(testString);
        expect((<any>service)._refreshTriggerListeners).toHaveBeenCalled();
    });

    it('should initialise and create popover body with template', () => {
        const template = componentInstance.template;

        jest.spyOn(<any>service, '_refreshTriggerListeners');
        service.templateContent = template;

        service.initialise(componentInstance.triggerRef, componentInstance);

        fixture.detectChanges();

        service.open();
        fixture.detectChanges();

        expect((<any>service)._triggerElement).toBe(componentInstance.triggerRef);
        expect((<any>service)._popoverBody._templateToDisplay).toBe(template);
        expect((<any>service)._refreshTriggerListeners).toHaveBeenCalled();
    });

    it('should initialise, open and pass some settings', () => {
        componentInstance.noArrow = false;
        componentInstance.isOpen = true;
        componentInstance.appendTo = componentInstance.triggerRef;
        jest.spyOn(service, 'open');

        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        fixture.detectChanges();

        expect(service.noArrow).toBe(false);
        expect(service.open).toHaveBeenCalled();
        expect(service['_overlayRef']).toBeTruthy();
        expect(service.isOpen).toBe(true);
        expect(service['_overlayRef'].hasAttached()).toBe(true);
        expect(service.appendTo).toBe(componentInstance.triggerRef);
    });

    it('should open', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        jest.spyOn(service.isOpenChange, 'emit');

        service.open();

        fixture.detectChanges();

        expect(service['_overlayRef']).toBeTruthy();
        expect(service.isOpen).toBe(true);
        expect(service.isOpenChange.emit).toHaveBeenCalledWith(true);
        expect(service['_overlayRef'].hasAttached()).toBe(true);
    });

    it('should open and close on refresh passed values', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        jest.spyOn(service, 'open');
        jest.spyOn(service, 'close');

        componentInstance.isOpen = true;

        service.refreshConfiguration(componentInstance);

        fixture.detectChanges();

        expect(service['_overlayRef']).toBeTruthy();
        expect(service.isOpen).toBe(true);
        expect(service.open).toHaveBeenCalled();

        componentInstance.isOpen = false;

        service.refreshConfiguration(componentInstance);

        fixture.detectChanges();

        expect(service.isOpen).toBe(false);
        expect(service.close).toHaveBeenCalled();
    });

    it('it should change values, when refreshConfiguration method is used', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        componentInstance.fillControlMode = 'at-least';
        componentInstance.noArrow = false;
        componentInstance.maxWidth = 120;

        service.refreshConfiguration(componentInstance);

        expect(service.fillControlMode).toBe('at-least');
        expect(service.noArrow).toBe(false);
        expect(service.maxWidth).toBe(120);
    });

    it('should close', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        jest.spyOn(service.isOpenChange, 'emit');

        service.open();
        fixture.detectChanges();

        expect(service['_overlayRef']).toBeTruthy();
        expect(service.isOpen).toBe(true);
        expect(service.isOpenChange.emit).toHaveBeenCalledWith(true);
        expect(service['_overlayRef'].hasAttached()).toBe(true);

        service.close();
        fixture.detectChanges();

        expect(service['_overlayRef'].hasAttached()).toBeFalsy();
        expect(service.isOpen).toBe(false);
        expect(service.isOpenChange.emit).toHaveBeenCalledWith(false);
    });

    it('should toggle', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        jest.spyOn(service, 'open');
        jest.spyOn(service, 'close');
        service.toggle();
        fixture.detectChanges();

        expect(service.open).toHaveBeenCalled();
        service.toggle();
        fixture.detectChanges();
        expect(service.close).toHaveBeenCalled();
    });

    it('should change trigger events on input change', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        componentInstance.triggers = ['keydown', 'mouseleave', 'mouseenter'];

        service.refreshConfiguration(componentInstance);

        fixture.detectChanges();
        expect(service['_eventRef'].length).toBe(3);
    });

    it('should handle close event from overlay', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.open();

        fixture.detectChanges();

        jest.spyOn(service, 'close');

        (<any>service)._overlayRef.detach();

        expect(service.close).toHaveBeenCalled();
    });

    it("shouldn't call close on inside click", () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.open();

        const mouseEvent = { composedPath: () => [componentInstance.triggerRef.nativeElement] };
        expect((<any>service)._shouldClose(mouseEvent)).not.toEqual(true);
    });

    it("shouldn't close on closeOnOutsideClick from popover body", () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());
        service.closeOnOutsideClick = false;

        service.open();

        fixture.detectChanges();

        jest.spyOn(service, 'close');

        document.body.click();

        expect(service.close).not.toHaveBeenCalled();
    });

    it("shouldn't close on escape keydown from popover body", () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());
        service.closeOnEscapeKey = false;

        service.open();

        fixture.detectChanges();

        jest.spyOn(service, 'close');

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);

        expect(service.close).not.toHaveBeenCalled();
    });

    it('should contain the appropriate classes when checkModalBackground is called and applyOverlay is true', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());
        service.closeOnOutsideClick = false;
        service.applyOverlay = true;

        service.open();

        service.checkModalBackground();

        fixture.detectChanges();

        expect(document.body.classList.contains('fd-overlay-active')).toBe(true);
        expect(document.querySelector('.fd-popover__modal')).toBeTruthy();
    });

    it('should resize overlay body at least, on refresh position', () => {
        componentInstance.fillControlMode = 'at-least';
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.open();
        fixture.detectChanges();

        (<any>service)._applyWidthOverlay();

        expect(componentInstance.popoverBody._popoverBodyMinWidth).toBe(
            componentInstance.triggerRef.nativeElement.offsetWidth
        );
    });

    it('should resize overlay body equal, on refresh position', () => {
        componentInstance.fillControlMode = 'equal';
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.open();
        fixture.detectChanges();

        (<any>service)._applyWidthOverlay();

        expect(componentInstance.popoverBody._popoverBodyWidth).toBe(
            componentInstance.triggerRef.nativeElement.offsetWidth
        );
    });

    it('should toggle open state on trigger event', () => {
        componentInstance.triggers = ['mouseenter', 'keydown'];
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());
        jest.spyOn(service, 'toggle');
        jest.spyOn(service, 'open');
        jest.spyOn(service, 'close');
        // should trigger the toggling
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(service.toggle).toHaveBeenCalledTimes(1);
        // should work fine with subsequent events
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(service.toggle).toHaveBeenCalledTimes(2);
        // should ignore irrelevant events
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('click'));
        expect(service.toggle).toHaveBeenCalledTimes(2);
        // should work fine with all specified triggers
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('keydown'));
        expect(service.toggle).toHaveBeenCalledTimes(3);

        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('keydown'));
        expect(service.toggle).toHaveBeenCalledTimes(4);

        expect(service.open).toHaveBeenCalledTimes(1);
        // "close" is being invoked twice for each action
        expect(service.close).toHaveBeenCalledTimes(2);
    });

    it('should support trigger config', () => {
        componentInstance.triggers = [
            { trigger: 'mouseenter', closeAction: true, openAction: true },
            { trigger: 'click', closeAction: false, openAction: true },
            { trigger: 'mouseleave', closeAction: true, openAction: false }
        ];
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());
        jest.spyOn(service, 'toggle');
        jest.spyOn(service, 'open');
        jest.spyOn(service, 'close');

        expect(service.isOpen).toBe(false);
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('click'));
        expect(service.toggle).toHaveBeenCalledTimes(1);
        expect(service.open).toHaveBeenCalledTimes(1);
        expect(service.close).toHaveBeenCalledTimes(0);

        expect(service.isOpen).toBe(true);
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('click'));
        expect(service.toggle).toHaveBeenCalledTimes(2);
        expect(service.open).toHaveBeenCalledTimes(1);
        expect(service.close).toHaveBeenCalledTimes(0);

        expect(service.isOpen).toBe(true);
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('click'));
        expect(service.toggle).toHaveBeenCalledTimes(3);
        expect(service.open).toHaveBeenCalledTimes(1);
        expect(service.close).toHaveBeenCalledTimes(0);

        expect(service.isOpen).toBe(true);
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(service.toggle).toHaveBeenCalledTimes(4);
        expect(service.open).toHaveBeenCalledTimes(1);
        expect(service.close).toHaveBeenCalledTimes(2);

        expect(service.isOpen).toBe(false);
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(service.toggle).toHaveBeenCalledTimes(5);
        expect(service.open).toHaveBeenCalledTimes(2);
        expect(service.close).toHaveBeenCalledTimes(2);

        expect(service.isOpen).toBe(true);
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('mouseleave'));
        expect(service.toggle).toHaveBeenCalledTimes(6);
        expect(service.open).toHaveBeenCalledTimes(2);
        expect(service.close).toHaveBeenCalledTimes(2 * 2);

        expect(service.isOpen).toBe(false);
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('mouseleave'));
        expect(service.toggle).toHaveBeenCalledTimes(7);
        expect(service.open).toHaveBeenCalledTimes(2);
        expect(service.close).toHaveBeenCalledTimes(2 * 2);

        expect(service.isOpen).toBe(false);
        componentInstance.triggerRef.nativeElement.dispatchEvent(new Event('mouseleave'));
        expect(service.toggle).toHaveBeenCalledTimes(8);
        expect(service.open).toHaveBeenCalledTimes(2);
        expect(service.close).toHaveBeenCalledTimes(2 * 2);
    });
});
