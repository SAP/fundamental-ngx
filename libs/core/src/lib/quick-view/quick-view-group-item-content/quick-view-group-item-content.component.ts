import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

import { QuickViewGroupItemContentElementDirective } from './quick-view-group-item-content-element.directive';
import { getClosest } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'fd-quick-view-group-item-content',
    templateUrl: './quick-view-group-item-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewGroupItemContentComponent implements AfterViewInit {
    /** @hidden */
    constructor(private readonly _elRef: ElementRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._bindElementAttributes();
    }

    /** @hidden
     * Needed for binding the id of the element and id of the proper label to aria-labelledby. */
    private _bindElementAttributes(): void {
        const parentId = getClosest('.fd-form-item', this._elRef.nativeElement)?.id;
        const id = `${parentId}-content`;

        const element = this._elRef.nativeElement.querySelector(`.${QuickViewGroupItemContentElementDirective.class}`);
        if (element && parentId) {
            element.setAttribute('id', id);
            element.setAttribute('aria-labelledby', `${parentId}-label ${id}`);
        }
    }
}
