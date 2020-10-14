import { Component, ChangeDetectionStrategy, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-layout-actions',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageLayoutActionsComponent {
    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /**
     * get reference to this element
     */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
}
