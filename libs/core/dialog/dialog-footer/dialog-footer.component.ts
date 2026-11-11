import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation, inject, input } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { BarComponent, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';
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
    host: {
        '[attr.role]': 'role()',
        '[attr.aria-label]': 'ariaLabel() || defaultAriaLabel()'
    },
    imports: [BarComponent, BarRightDirective, ContentDensityDirective, NgTemplateOutlet]
})
export class DialogFooterComponent extends DialogFooterBase implements AfterViewInit {
    /** @hidden */
    dialogConfig = inject(DialogConfig, { optional: true }) || {};

    /** Role of the dialog footer element Default is 'region' */
    readonly role = input('region');

    /** Aria label of the dialog footer element */
    readonly ariaLabel = input<string>();

    /** @hidden */
    protected readonly defaultAriaLabel = resolveTranslationSignal('coreDialog.footerAriaLabel');

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenForButtonChanges(DialogButtonClass);
    }
}
