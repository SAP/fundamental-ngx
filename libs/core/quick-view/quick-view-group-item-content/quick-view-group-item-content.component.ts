import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

import { QuickViewGroupItemContentElementDirective } from './quick-view-group-item-content-element.directive';

@Component({
    selector: 'fd-quick-view-group-item-content',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class QuickViewGroupItemContentComponent implements AfterViewInit {
    /** @ignore */
    constructor(private readonly _elRef: ElementRef<Element>) {}

    /** @ignore */
    ngAfterViewInit(): void {
        this._bindElementAttributes();
    }

    /** @ignore
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
