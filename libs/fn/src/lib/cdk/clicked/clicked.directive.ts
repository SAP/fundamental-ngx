import { Directive, ElementRef, Output } from '@angular/core';
import { ClickedObservable } from './clicked.observable';

@Directive({
    selector: '[fnClicked]'
})
export class ClickedDirective {
    @Output() fnClicked = new ClickedObservable(this._elementRef);

    constructor(private _elementRef: ElementRef<HTMLElement>) {}
}
