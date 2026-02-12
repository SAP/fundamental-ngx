import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    ViewChild,
    inject
} from '@angular/core';
import { BarComponent, BarElementDirective, BarLeftDirective } from '@fundamental-ngx/core/bar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DialogHeaderBase } from '@fundamental-ngx/core/dialog';
import { MessageBoxSemanticIconComponent } from '../message-box-semantic-icon/message-box-semantic-icon.component';
import { MessageBoxConfig, MessageBoxHost } from '../utils/message-box-config.class';

/**
 * Building block of the message box used to create message box header.
 *
 * ```html
 * <fd-message-box-header>
 *     <fd-message-box-semantic-icon></fd-message-box-semantic-icon>
 *     <h1 fd-title><!-- Content --></h1>
 * </fd-message-box-header>
 *
 * Complex header:
 * <fd-message-box-header>
 *     <ng-template fdkTemplate="header"><!--Content--></ng-template>
 *     <ng-template fdkTemplate="subheader"><!--Content--></ng-template>
 * </fd-message-box-header>
 * ```
 */
@Component({
    selector: 'fd-message-box-header',
    templateUrl: './message-box-header.component.html',
    imports: [
        BarComponent,
        ContentDensityDirective,
        NgTemplateOutlet,
        BarLeftDirective,
        BarElementDirective,
        MessageBoxSemanticIconComponent
    ]
})
export class MessageBoxHeaderComponent extends DialogHeaderBase implements AfterViewInit {
    /** @hidden */
    @ViewChild('defaultTemplateHeaderBar')
    defaultTemplateHeaderBar?: ElementRef<Element>;

    /** @hidden */
    @ContentChild(MessageBoxSemanticIconComponent)
    _projectedSemanticIcon: MessageBoxSemanticIconComponent;

    /** @hidden */
    get messageBoxConfig(): MessageBoxConfig {
        return this._messageBox?._messageBoxConfig || {};
    }

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _messageBox = inject(MessageBoxHost, { optional: true });

    /** @hidden */
    get _showSemanticIcon(): boolean {
        return (
            !this._projectedSemanticIcon &&
            ((this.messageBoxConfig.type && this.messageBoxConfig.showSemanticIcon) ||
                !!this.messageBoxConfig.customSemanticIcon)
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        // need to re-check bindings after initialisation in order to reflect the proper state of "_showSemanticIcon" getter
        // running this in next microtask to avoid "ExpressionChangedAfterItHasBeenCheckedError"
        Promise.resolve().then(() => this._cdr.markForCheck());
    }
}
