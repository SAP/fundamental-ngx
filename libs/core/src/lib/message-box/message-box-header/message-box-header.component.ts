import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Optional,
    ViewChild
} from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush
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
        return this.messageBox?._messageBoxConfig || {};
    }

    /** @hidden */
    constructor(private _cdr: ChangeDetectorRef, @Optional() private messageBox?: MessageBoxHost) {
        super(_cdr);
    }

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
