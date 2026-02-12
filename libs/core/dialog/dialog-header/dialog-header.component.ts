import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { BarComponent, BarElementDirective, BarLeftDirective, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DEFAULT_TITLE_SIZE } from '@fundamental-ngx/core/title';
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
}
