import { AfterContentInit, ChangeDetectorRef, Component, Optional } from '@angular/core';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogHeaderBase } from '../base/dialog-header-base.class';
import { BarComponent, BarElementDirective, BarLeftDirective, BarRightDirective } from '@fundamental-ngx/core/bar';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';

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
    standalone: true,
    imports: [
        BarComponent,
        ContentDensityDirective,
        NgTemplateOutlet,
        BarLeftDirective,
        BarElementDirective,
        BarRightDirective,
        NgIf
    ]
})
export class DialogHeaderComponent extends DialogHeaderBase implements AfterContentInit {
    /** @hidden */
    constructor(@Optional() public dialogConfig: DialogConfig, changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
        this.dialogConfig = this.dialogConfig || {};
    }

    /** @hidden */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }
}
