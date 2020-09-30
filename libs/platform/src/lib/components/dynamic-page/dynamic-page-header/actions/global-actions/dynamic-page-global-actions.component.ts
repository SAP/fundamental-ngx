import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-global-actions',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageGlobalActionsComponent {
    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /**
     * get reference to this element
     */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
}
