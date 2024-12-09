import { AfterContentInit, ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
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
    imports: [BarModule, ContentDensityDirective, NgTemplateOutlet]
})
export class DialogHeaderComponent extends DialogHeaderBase implements AfterContentInit {
    /** @hidden */
    dialogConfig = inject(DialogConfig, { optional: true }) || {};
}
