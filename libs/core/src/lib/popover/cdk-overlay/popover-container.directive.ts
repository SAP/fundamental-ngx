import { Directive, ElementRef } from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Directive({
    selector: '[fd-popover-container], [fdPopoverContainer]'
})
export class PopoverContainerDirective {

    constructor(
        protected _elementReference: ElementRef,
        protected readonly _cdkOverlayContainer: OverlayContainer
    ) {

        console.log(this._cdkOverlayContainer);
        this._elementReference = _elementReference;
        this._cdkOverlayContainer = _cdkOverlayContainer;
        console.log(this._elementReference.nativeElement);
        this._cdkOverlayContainer['myCreateContainer'](this._elementReference.nativeElement);
    }
}
