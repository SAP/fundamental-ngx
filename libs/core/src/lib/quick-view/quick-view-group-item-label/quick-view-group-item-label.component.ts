import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { getClosest } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'fd-quick-view-group-item-label',
    templateUrl: './quick-view-group-item-label.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewGroupItemLabelComponent implements AfterViewInit {
    /** @hidden */
    constructor(private readonly _elRef: ElementRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._bindElementAttributes();
    }

    /** @hidden
     * Needed for binding the id to the label element (and this id needed for aria-labelledby of proper element). */
    private _bindElementAttributes(): void {
        const parentId = getClosest('.fd-form-item', this._elRef.nativeElement)?.id;

        if (this._elRef.nativeElement.firstChild && parentId) {
            this._elRef.nativeElement.firstChild.setAttribute('id', `${parentId}-label`);
        }
    }
}
