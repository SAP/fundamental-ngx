import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopoverBodyComponent } from './popover-body.component';
import { ESCAPE } from '@angular/cdk/keycodes';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { DefaultPositions, PopoverPosition } from '../popover-position/popover-position';
import { PopoverModule } from '../popover.module';
import { A11yModule } from '@angular/cdk/a11y';

describe('PopoverBodyComponent', () => {
    let component: PopoverBodyComponent;
    let fixture: ComponentFixture<PopoverBodyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, OverlayModule, A11yModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle escape key', () => {
        spyOn(component.onClose, 'next');
        const keyboardEvent: any = {key: ESCAPE, keyCode: ESCAPE};
        component._closeOnEscapeKey = true;
        component.bodyKeydownHandler(keyboardEvent);
        expect(component.onClose.next).toHaveBeenCalled();
    });

    it('should change arrow classes', () => {

        spyOn(<any>component, '_addMarginStyle');


        const firstPosition: ConnectedPosition = DefaultPositions[0];


        component._setArrowStyles(firstPosition, 'ltr');
        const arrowDirection = PopoverPosition.getArrowPosition(firstPosition);

        expect(component._arrowClasses).toEqual([
            `fd-popover__arrow--${arrowDirection}`,
            'fd-popover__arrow-x--start'
        ]);

        expect((<any>component)._addMarginStyle).toHaveBeenCalledWith(arrowDirection);
    });

    it('should change arrow classes 2', () => {

        spyOn(<any>component, '_addMarginStyle');


        const firstPosition: ConnectedPosition = DefaultPositions[5];


        component._setArrowStyles(firstPosition, 'ltr');
        const arrowDirection = PopoverPosition.getArrowPosition(firstPosition);

        expect(component._arrowClasses).toEqual([
            `fd-popover__arrow--${arrowDirection}`,
            'fd-popover__arrow-x--end'
        ]);

        expect((<any>component)._addMarginStyle).toHaveBeenCalledWith(arrowDirection);
    });

    it('should change arrow classes with RTL', () => {

        spyOn(<any>component, '_addMarginStyle');


        const firstPosition: ConnectedPosition = DefaultPositions[0];


        component._setArrowStyles(firstPosition, 'ltr');
        const arrowDirection = PopoverPosition.getArrowPosition(firstPosition);

        expect(component._arrowClasses).toEqual([
            `fd-popover__arrow--${arrowDirection}`,
            'fd-popover__arrow-x--start'
        ]);

        expect((<any>component)._addMarginStyle).toHaveBeenCalledWith(arrowDirection);
    });

    it('should change arrow classes with RTL 2', () => {

        spyOn(<any>component, '_addMarginStyle');


        const firstPosition: ConnectedPosition = DefaultPositions[0];


        component._setArrowStyles(firstPosition, 'ltr');
        const arrowDirection = PopoverPosition.getArrowPosition(firstPosition);

        expect(component._arrowClasses).toEqual([
            `fd-popover__arrow--${arrowDirection}`,
            'fd-popover__arrow-x--start'
        ]);

        expect((<any>component)._addMarginStyle).toHaveBeenCalledWith(arrowDirection);
    });
});
