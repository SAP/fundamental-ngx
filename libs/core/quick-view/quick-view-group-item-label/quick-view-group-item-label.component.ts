import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-quick-view-group-item-label',
    templateUrl: './quick-view-group-item-label.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormLabelComponent]
})
export class QuickViewGroupItemLabelComponent implements AfterViewInit {
    /** @ignore */
    constructor(private readonly _elRef: ElementRef<Element>) {}

    /** @ignore */
    ngAfterViewInit(): void {
        this._bindElementAttributes();
    }

    /** @ignore
     * Needed for binding the id to the label element (and this id needed for aria-labelledby of proper element). */
    private _bindElementAttributes(): void {
        const parentId = this._elRef.nativeElement.closest('.fd-form-item')?.id;

        const child = this._elRef.nativeElement.firstChild;
        if (child instanceof Element && parentId) {
            child.setAttribute('id', `${parentId}-label`);
        }
    }
}
