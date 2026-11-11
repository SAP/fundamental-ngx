import { ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, inject, input } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { BarComponent, BarElementDirective, BarLeftDirective, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DEFAULT_TITLE_SIZE } from '@fundamental-ngx/core/title';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';
import { DialogHeaderBase } from '../base/dialog-header-base.class';
import { DialogConfig } from '../utils/dialog-config.class';

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
    templateUrl: './dialog-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.role]': 'role()',
        '[attr.aria-label]': 'ariaLabel() || defaultAriaLabel()'
    },
    providers: [
        {
            provide: DEFAULT_TITLE_SIZE,
            useValue: 5
        }
    ],
    imports: [
        BarComponent,
        BarLeftDirective,
        BarRightDirective,
        BarElementDirective,
        ContentDensityDirective,
        NgTemplateOutlet
    ]
})
export class DialogHeaderComponent extends DialogHeaderBase {
    /** @hidden */
    dialogConfig = inject(DialogConfig, { optional: true }) || {};

    /** @hidden */
    readonly inShellbar = input(false, { transform: booleanAttribute });

    /** Role of the dialog header element Default is 'region' */
    readonly role = input('region');

    /** Aria label of the dialog header element */
    readonly ariaLabel = input<string>();

    /** @hidden */
    protected readonly defaultAriaLabel = resolveTranslationSignal('coreDialog.headerAriaLabel');
}
