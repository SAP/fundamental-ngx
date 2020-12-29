import { AfterContentInit, Component, ContentChild, ElementRef, Optional } from '@angular/core';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../../dialog/utils/dialog-ref.class';
import { WizardComponent } from '../../wizard/wizard.component';

/**
 * Applies fundamental layout and styling to the contents of a dialog body.
 *
 * ```html
 * <fd-dialog-body>
 *     <!-- Content -->
 * </fd-dialog-body>
 * ```
 */
@Component({
    selector: 'fd-dialog-body',
    templateUrl: 'dialog-body.component.html',
    host: {
        '[class.fd-dialog__body]': 'true',
        '[class.fd-dialog__body--no-vertical-padding]': '!dialogConfig.verticalPadding'
    }
})
export class DialogBodyComponent implements AfterContentInit {

    /** @hidden */
    @ContentChild(WizardComponent)
    wizard: WizardComponent;

    /** @hidden */
    constructor(
        private _elRef: ElementRef,
        @Optional() public dialogConfig: DialogConfig,
        @Optional() public dialogRef: DialogRef
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.wizard) {
            this._elRef.nativeElement.style.paddingTop = '0px';
            this._elRef.nativeElement.style.paddingBottom = '0px';
        }
    }
}
