import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Optional,
    ViewEncapsulation
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DialogFooterBase } from '../base/dialog-footer-base.class';
import { DialogConfig } from '../utils/dialog-config.class';

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
    templateUrl: './dialog-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BarModule, ContentDensityDirective, NgTemplateOutlet]
})
export class DialogFooterComponent extends DialogFooterBase implements AfterContentInit, AfterViewInit {
    /** @ignore */
    constructor(@Optional() public dialogConfig: DialogConfig) {
        super();
        this.dialogConfig = this.dialogConfig || {};
    }

    /** @ignore */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._listenForButtonChanges(DialogButtonClass);
    }
}
