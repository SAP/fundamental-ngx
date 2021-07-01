import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Optional } from '@angular/core';
import { DialogHeaderBase } from '@fundamental-ngx/core/dialog';
import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from '../utils/message-box-config.class';

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
 *     <ng-template fdTemplate="header"><!--Content--></ng-template>
 *     <ng-template fdTemplate="subheader"><!--Content--></ng-template>
 * </fd-message-box-header>
 * ```
 */
@Component({
    selector: 'fd-message-box-header',
    templateUrl: './message-box-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxHeaderComponent, multi: true }
    ]
})
export class MessageBoxHeaderComponent extends DialogHeaderBase implements AfterContentInit, MessageBoxConfigurableElement {

    /** @hidden */
    constructor(
        @Optional() public messageBoxConfig: MessageBoxConfig,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(changeDetectorRef);
        this.messageBoxConfig = this.messageBoxConfig || {};
    }

    /** @hidden */
    get _showSemanticIcon(): boolean {
        return this.messageBoxConfig.type && this.messageBoxConfig.showSemanticIcon || !!this.messageBoxConfig.customSemanticIcon
    }

    /** @hidden */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }
}
