import { PopoverModule } from '../popover.module';
import { CdkPopoverComponent } from './cdk-popover.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { DefaultPositions, PopoverPosition } from './popover-position';


describe('CdkPopoverComponent', () => {
    let component: CdkPopoverComponent;
    let fixture: ComponentFixture<CdkPopoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, OverlayModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CdkPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open and prepare overlay', () => {
        spyOn(component.isOpenChange, 'emit');
        component.open();

        fixture.detectChanges();

        expect(component['_overlayRef']).toBeTruthy();
        expect(component['_overlayRef'].hasAttached()).toBeTrue();
        expect(component.isOpen).toBeTrue();
        expect(component.isOpenChange.emit).toHaveBeenCalledWith(true);
    });

    it('should close, dispose overlay and remove arrows', () => {
        component.noArrow = false;
        component.open();

        component.arrowPosition = 'top';
        component.marginStyle = 'margin-top: 0.5rem;';

        fixture.detectChanges();

        expect(component['_overlayRef']).toBeTruthy();
        expect(component['_overlayRef'].hasAttached()).toBeTrue();

        component.close();

        fixture.detectChanges();

        expect(component['_overlayRef'].hasAttached()).toBeFalse();
        expect(component.isOpen).toBeFalse();
        expect(component.arrowPosition).toBeFalsy();
        expect(component.marginStyle).toBeFalsy();
    });

    it('should call close on open input change', () => {
        spyOn(component, 'close');
        component.ngOnChanges(<any>{ isOpen: { currentValue: false } });
        expect(component.close).toHaveBeenCalled()
    });

    it('should change trigger events on input change', () => {
        component.triggers = ['keydown', 'mouseleave', 'mouseenter'];
        component.ngOnChanges(<any>{ triggers: { currentValue: component.triggers } });
        fixture.detectChanges();
        expect(component['_eventRef'].length).toBe(3);
    });

    it('should handle close event from overlay', () => {
        component.open();

        fixture.detectChanges();

        spyOn(component, 'close');

        (<any>component)._overlayRef.detach();

        expect(component.close).toHaveBeenCalled();

    });

    it('shouldn\'t call close on inside click', () => {
        component.open();

        const mouseEvent = { composedPath: () => [component.triggerOrigin.elementRef.nativeElement] };
        expect((<any>component)._shouldClose(mouseEvent)).not.toEqual(true);
    });

    it('shouldn close on escape keydown', () => {
        component.open();

        fixture.detectChanges();

        spyOn(component, 'close');

        component.bodyKeydownHandler(new KeyboardEvent('keydown', { key: 'Escape' }));

        expect(component.close).toHaveBeenCalled();
    });

    it('shouldn open on ArrowDown and Alt keydown', () => {
        spyOn(component, 'open');

        component.triggerKeyDownHandler(new KeyboardEvent('keydown', { key: 'ArrowDown', altKey: true }));

        expect(component.open).toHaveBeenCalled();
    });

    it('should resize overlay body at least, on refresh position', () => {
        component.fillControlMode = 'at-least';
        component.open();
        fixture.detectChanges();

        spyOn((<any>component)._overlayRef, 'updateSize');

        (<any>component)._applyWidthOverlay()

        expect((<any>component)._overlayRef.updateSize).toHaveBeenCalledWith(
            { minWidth: component.triggerOrigin.elementRef.nativeElement.offsetWidth }
        );
    });

    it('should resize overlay body equal, on refresh position', () => {
        component.fillControlMode = 'equal';
        component.open();
        fixture.detectChanges();

        spyOn((<any>component)._overlayRef, 'updateSize');

        (<any>component)._applyWidthOverlay()

        expect((<any>component)._overlayRef.updateSize).toHaveBeenCalledWith(
            { width: component.triggerOrigin.elementRef.nativeElement.offsetWidth }
        );
    });

    it('should apply correct arrow and margin styles and change', () => {
        const firstDefaultPosition: ConnectedPosition = DefaultPositions[0];
        component.noArrow = false;
        component.open();
        fixture.detectChanges();
        const arrowPosition = PopoverPosition.getArrowPosition(firstDefaultPosition);
        expect(component.arrowPosition).toBe(arrowPosition);
        expect(component.marginStyle).toBe(PopoverPosition.getMarginStyle(arrowPosition));

        const secondPosition: ConnectedPosition = DefaultPositions[3];
        component.applyNewPosition([secondPosition]);
        fixture.detectChanges();

        const arrowSecondPosition = PopoverPosition.getArrowPosition(secondPosition);
        expect(component.arrowPosition).toBe(arrowSecondPosition);
        expect(component.marginStyle).toBe(PopoverPosition.getMarginStyle(arrowSecondPosition));
    });

    it('should toggle open state on trigger event', () => {
        const mouseoverEvent = new Event('mouseenter');
        component.triggers = ['mouseenter'];
        (<any>component)._refreshTriggerListeners();
        spyOn(component, 'toggle');
        component.triggerOrigin.elementRef.nativeElement.dispatchEvent(mouseoverEvent);
        expect(component.toggle).toHaveBeenCalled();
    })

    it('shouldn\'t toggle open state on trigger event', () => {
        const click = new Event('click');
        component.triggers = ['mouseenter'];
        (<any>component)._refreshTriggerListeners();
        spyOn(component, 'toggle');
        component.triggerOrigin.elementRef.nativeElement.dispatchEvent(click);
        expect(component.toggle).not.toHaveBeenCalled();
    })
});
