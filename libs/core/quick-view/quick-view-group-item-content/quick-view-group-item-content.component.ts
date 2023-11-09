import { AfterViewInit, Directive, ElementRef } from '@angular/core';

import { QuickViewGroupItemContentElementDirective } from './quick-view-group-item-content-element.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-quick-view-group-item-content',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class QuickViewGroupItemContentComponent implements AfterViewInit {
    /** @hidden */
    constructor(private readonly _elRef: ElementRef<Element>) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._bindElementAttributes();
    }

    /** @hidden
     * Needed for binding the id of the element and id of the proper label to aria-labelledby. */
    private _bindElementAttributes(): void {
        const parentId = this._elRef.nativeElement.closest('.fd-form-item')?.id;
        const id = `${parentId}-content`;

        const element = this._elRef.nativeElement.querySelector(`.${QuickViewGroupItemContentElementDirective.class}`);
        if (element && parentId) {
            element.setAttribute('id', id);
            element.setAttribute('aria-labelledby', `${parentId}-label ${id}`);
        }
    }
}
