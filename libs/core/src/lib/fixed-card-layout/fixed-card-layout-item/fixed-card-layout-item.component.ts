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
    @HostBinding()
    tabindex = 0;

    constructor(private _elementRef: ElementRef) {}

    focus(): void {
        this._elementRef.nativeElement.focus();
    }
}
