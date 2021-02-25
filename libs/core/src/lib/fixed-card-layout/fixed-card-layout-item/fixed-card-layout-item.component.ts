import { Component, ElementRef, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
    selector: 'fd-fixed-card-layout-item',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: block'
    }
})
export class FixedCardLayoutItemComponent implements FocusableOption {
    /** @hidden */
    @HostBinding()
    tabindex = 0;

    constructor(private _elementRef: ElementRef) {}

    /** Set focus on the element. */
    focus(): void {
        this._elementRef.nativeElement.focus();
    }
}
