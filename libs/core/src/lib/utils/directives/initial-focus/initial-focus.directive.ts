import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdInitialFocus], [fd-initial-focus]'
})
export class InitialFocusDirective implements AfterViewInit {

    constructor(private _elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        this._focus();
    }

    private _focus(): void {
        if (this._elementRef.nativeElement && typeof this._elementRef.nativeElement.focus === 'function') {
            this._elementRef.nativeElement.focus();
        }
    }
}
