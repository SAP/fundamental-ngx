import { AfterContentInit, AfterViewInit, Component, Optional } from '@angular/core';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogFooterBase } from '../base/dialog-footer-base.class';

export const DialogButtonClass = 'fd-dialog__decisive-button';

/**
 * Building block of the dialog used to create dialog button.
 *
 * ```html
 * <fd-dialog-footer><!--Content--></fd-dialog-footer>
 *
 * Complex footer:
 * <fd-dialog-footer>
 *     <ng-template fdkTemplate="footer"><!--Content--></ng-template>
 * </fd-dialog-footer>
 * ```
 * */
@Component({
    selector: 'fd-dialog-footer',
    templateUrl: './dialog-footer.component.html'
})
export class DialogFooterComponent extends DialogFooterBase implements AfterContentInit, AfterViewInit {
    /** @hidden */
    constructor(@Optional() public dialogConfig: DialogConfig) {
        super();
        this.dialogConfig = this.dialogConfig || {};
    }

    /** @hidden */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenForButtonChanges(DialogButtonClass);
    }
}
