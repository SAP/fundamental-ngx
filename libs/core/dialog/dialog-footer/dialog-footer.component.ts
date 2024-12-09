import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    inject
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
    imports: [BarModule, ContentDensityDirective, NgTemplateOutlet]
})
export class DialogFooterComponent extends DialogFooterBase implements AfterContentInit, AfterViewInit {
    /** @hidden */
    dialogConfig = inject(DialogConfig, { optional: true }) || {};

    /** @hidden */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenForButtonChanges(DialogButtonClass);
    }
}
