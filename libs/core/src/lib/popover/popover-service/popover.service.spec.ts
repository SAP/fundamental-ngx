import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverService, PopoverTemplate } from './popover.service';
import { Component, ElementRef, Injector, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PopoverBodyComponent } from '../popover-body/popover-body.component';
import { BasePopoverClass } from '../base/base-popover.class';
import { PopoverModule } from '../popover.module';
import { Overlay, ViewportRuler } from '@angular/cdk/overlay';
import { RtlService } from '../../utils/services/rtl.service';


@Component({
    template: `
        <fd-popover-body></fd-popover-body>
        <ng-template #templateRef></ng-template>
        <ng-container #container></ng-container>
        <div #triggerElement>trigger</div>
    `,
    providers: [ PopoverService ]
})
class PopoverTestComponent extends BasePopoverClass {
    @ViewChild(PopoverBodyComponent) popoverBody: PopoverBodyComponent;

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    @ViewChild('templateRef') template: TemplateRef<any>;
    @ViewChild('triggerElement', { read: ElementRef }) triggerRef: ElementRef;

    getPopoverTemplateData(): PopoverTemplate {
        return {
            template: this.template,
            container: this.container,
            popoverBody: this.popoverBody
        };
    }

    constructor(public popoverService: PopoverService) {
        super();
    }
}

describe('PopoverService', () => {
    let service: PopoverService;
    let componentInstance: PopoverTestComponent;
    let fixture: ComponentFixture<PopoverTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule],
            declarations: [PopoverTestComponent],
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
        spyOn(<any>service, '_refreshTriggerListeners');

        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        fixture.detectChanges();

        expect((<any>service)._templateData).toEqual(componentInstance.getPopoverTemplateData())
        expect((<any>service)._triggerElement).toBe(componentInstance.triggerRef)
        expect((<any>service)._refreshTriggerListeners).toHaveBeenCalled();
    });

    it('should initialise and create popover body only with text', () => {
        const testString = 'teststring';
        spyOn(<any>service, '_refreshTriggerListeners');
        service.stringContent = testString;

        service.initialise(componentInstance.triggerRef, componentInstance);
        fixture.detectChanges();

        service.open();

        fixture.detectChanges();

        expect((<any>service)._triggerElement).toBe(componentInstance.triggerRef)
        expect((<any>service)._popoverBody.text).toBe(testString)
        expect((<any>service)._refreshTriggerListeners).toHaveBeenCalled();
    });

    it('should initialise and create popover body with template', () => {
        const template = componentInstance.template;

        spyOn(<any>service, '_refreshTriggerListeners');
        service.templateContent = template;

        service.initialise(componentInstance.triggerRef, componentInstance);

        fixture.detectChanges();

        service.open();
        fixture.detectChanges();

        expect((<any>service)._triggerElement).toBe(componentInstance.triggerRef)
        expect((<any>service)._popoverBody._templateToDisplay).toBe(template)
        expect((<any>service)._refreshTriggerListeners).toHaveBeenCalled();
    });

    it('should initialise, open and pass some settings', () => {
        componentInstance.noArrow = false;
        componentInstance.isOpen = true;
        spyOn(service, 'open').and.callThrough();

        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        fixture.detectChanges();

        expect(service.noArrow).toBe(false);
        expect(service.open).toHaveBeenCalled();
        expect(service['_overlayRef']).toBeTruthy();
        expect(service.isOpen).toBeTrue();
        expect(service['_overlayRef'].hasAttached()).toBeTrue();
    });

    it('should open', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        spyOn(service.isOpenChange, 'emit').and.callThrough();

        service.open();

        fixture.detectChanges();

        expect(service['_overlayRef']).toBeTruthy();
        expect(service.isOpen).toBeTrue();
        expect(service.isOpenChange.emit).toHaveBeenCalledWith(true);
        expect(service['_overlayRef'].hasAttached()).toBeTrue();
    });

    fit('should open and close on refresh passed values', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        spyOn(service, 'open').and.callThrough();
        spyOn(service, 'close').and.callThrough();

        componentInstance.isOpen = true;

        service.refreshPassedValues(componentInstance);

        fixture.detectChanges();

        expect(service['_overlayRef']).toBeTruthy();
        expect(service.isOpen).toBeTrue();
        expect(service.open).toHaveBeenCalled();

        componentInstance.isOpen = false;

        service.refreshPassedValues(componentInstance);

        fixture.detectChanges();

        expect(service.isOpen).toBeFalse();
        expect(service.close).toHaveBeenCalled();
    });

    fit('it should change values, when refreshPassedValues method is used', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        componentInstance.fillControlMode = 'at-least';
        componentInstance.noArrow = false;
        componentInstance.maxWidth = 120;

        service.refreshPassedValues(componentInstance);

        expect(service.fillControlMode).toBe('at-least')
        expect(service.noArrow).toBe(false)
        expect(service.maxWidth).toBe(120)
    });

    it('should close', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        spyOn(service.isOpenChange, 'emit').and.callThrough();

        service.open();
        fixture.detectChanges();

        expect(service['_overlayRef']).toBeTruthy();
        expect(service.isOpen).toBeTrue();
        expect(service.isOpenChange.emit).toHaveBeenCalledWith(true);
        expect(service['_overlayRef'].hasAttached()).toBeTrue();

        service.close();
        fixture.detectChanges();

        expect(service['_overlayRef'].hasAttached()).toBeFalsy();
        expect(service.isOpen).toBeFalse();
        expect(service.isOpenChange.emit).toHaveBeenCalledWith(false);

    });

    it('should toggle', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        spyOn(service, 'open').and.callThrough();
        spyOn(service, 'close').and.callThrough();
        service.toggle();
        fixture.detectChanges();

        expect(service.open).toHaveBeenCalled();
        service.toggle();
        fixture.detectChanges();
        expect(service.close).toHaveBeenCalled();
    });

    it('should change trigger events on input change', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.refreshListeners(['keydown', 'mouseleave', 'mouseenter']);
        fixture.detectChanges();
        expect(service['_eventRef'].length).toBe(3);
    });

    it('should handle close event from overlay', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.open();

        fixture.detectChanges();

        spyOn(service, 'close').and.callThrough();

        (<any>service)._overlayRef.detach();

        expect(service.close).toHaveBeenCalled();

    });

    it('shouldn\'t call close on inside click', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.open();

        const mouseEvent = { composedPath: () => [componentInstance.triggerRef.nativeElement] };
        expect((<any>service)._shouldClose(mouseEvent)).not.toEqual(true);
    });

    it('shouldn close on escape keydown from popover body', () => {
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.open();

        fixture.detectChanges();

        spyOn(service, 'close').and.callThrough();

        componentInstance.popoverBody.onClose.next();

        expect(service.close).toHaveBeenCalled();
    });

    it('should resize overlay body at least, on refresh position', () => {
        componentInstance.fillControlMode = 'at-least';
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.open();
        fixture.detectChanges();

        (<any>service)._applyWidthOverlay();

        expect(componentInstance.popoverBody._popoverBodyMinWidth).toBe(componentInstance.triggerRef.nativeElement.offsetWidth);
    });

    it('should resize overlay body equal, on refresh position', () => {
        componentInstance.fillControlMode = 'equal';
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());

        service.open();
        fixture.detectChanges();

        (<any>service)._applyWidthOverlay();

        expect(componentInstance.popoverBody._popoverBodyWidth).toBe(componentInstance.triggerRef.nativeElement.offsetWidth);
    });

    it('should toggle open state on trigger event', () => {
        componentInstance.triggers = ['mouseenter'];
        service.initialise(componentInstance.triggerRef, componentInstance, componentInstance.getPopoverTemplateData());
        const mouseoverEvent = new Event('mouseenter');
        spyOn(service, 'toggle');
        componentInstance.triggerRef.nativeElement.dispatchEvent(mouseoverEvent);
        expect(service.toggle).toHaveBeenCalled();
    })
});
