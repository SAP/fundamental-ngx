import { AfterContentInit, ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { DIALOG_CONFIG, DialogConfig } from '../utils/dialog-config.class';
import { DialogHeaderBase } from '../base/dialog-header-base.class';

/**
 * Applies fundamental layout and styling to the contents of a dialog header.
 *
 * ```html
 * <fd-dialog-header>
 *     <h1 fd-title>Title</h1>
 *     <button fd-dialog-close-button></button>
 * </fd-dialog-header>
 * ```
 */
@Component({
    selector: 'fd-dialog-header',
    templateUrl: './dialog-header.component.html'
})
export class DialogHeaderComponent extends DialogHeaderBase implements AfterContentInit {

    /** @hidden */
    constructor(
        @Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(changeDetectorRef);
        this.dialogConfig = this.dialogConfig || {};
    }

    /** @hidden */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }
}
