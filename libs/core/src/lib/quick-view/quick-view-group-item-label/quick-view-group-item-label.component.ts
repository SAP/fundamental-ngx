import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

@Component({
    selector: 'fd-quick-view-group-item-label',
    templateUrl: './quick-view-group-item-label.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewGroupItemLabelComponent implements AfterViewInit {
    /** @hidden */
    constructor(private readonly _elRef: ElementRef<Element>) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._bindElementAttributes();
    }

    /** @hidden
     * Needed for binding the id to the label element (and this id needed for aria-labelledby of proper element). */
    private _bindElementAttributes(): void {
        const parentId = this._elRef.nativeElement.closest('.fd-form-item')?.id;

        const child = this._elRef.nativeElement.firstChild;
        if (child instanceof Element && parentId) {
            child.setAttribute('id', `${parentId}-label`);
        }
    }
}
