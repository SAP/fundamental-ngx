import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';
import { DialogBase } from '@fundamental-ngx/core/dialog';

import { CSS_CLASS_NAME } from './utils/const';
import { MessageBoxConfig, MessageBoxHost } from './utils/message-box-config.class';
import { MessageBoxRef } from './utils/message-box-ref.class';

/**
 * Message box component.
 *
 * ```html
 * <fd-message-box>
 *      <fd-message-box-header></fd-message-box-header>
 *      <fd-message-box-body></fd-message-box-body>
 *      <fd-message-box-footer></fd-message-box-footer>
 * </fd-message-box>
 * ```
 */
@Component({
    selector: 'fd-message-box',
    templateUrl: './message-box.component.html',
    styleUrl: './message-box.component.scss',
    host: {
        tabindex: '-1'
    },
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MessageBoxHost, useExisting: MessageBoxComponent }],
    standalone: true
})
export class MessageBoxComponent
    extends DialogBase
    implements AfterViewInit, OnInit, OnChanges, OnDestroy, CssClassBuilder, MessageBoxHost
{
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
    }

    /** MessageBoxRef - should be used for Template based Dialog implementation  */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('messageBoxRef')
    set embeddedMessageBoxRef(value: MessageBoxRef) {
        this._messageBoxRef = value;
    }

    /** MessageBoxConfig - should be used for Template based Dialog implementation  */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('messageBoxConfig')
    set embeddedMessageBoxConfig(value: MessageBoxConfig) {
        this._messageBoxConfig = value;
    }

    /** @hidden */
    @ViewChild('dialogWindow')
    dialogWindow: ElementRef;

    /** @hidden */
    get _config(): MessageBoxConfig {
        return this._messageBoxConfig;
    }

    /** @hidden */
    get _ref(): MessageBoxRef {
        return this._messageBoxRef;
    }

    /** @hidden */
    private _class = '';

    /** @hidden */
    constructor(
        @Optional() public _messageBoxConfig: MessageBoxConfig,
        @Optional() private _messageBoxRef: MessageBoxRef
    ) {
        super();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            CSS_CLASS_NAME.messageBoxActive,
            this._messageBoxTypeClass,
            this._messageBoxConfig.hasBackdrop ? CSS_CLASS_NAME.messageBox : '',
            this._messageBoxConfig.backdropClass ? this._messageBoxConfig.backdropClass : '',
            this._class
        ];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        // Manually call parent setup methods for test environments where afterNextRender may not execute
        if (this.dialogWindow) {
            this.setupFocusTrap();
            this.applyStyles();
            this.setupResizeObserver();
            this._ref?.loaded();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    /** @hidden */
    private get _messageBoxTypeClass(): string {
        switch (this._config.type) {
            case 'error':
                return CSS_CLASS_NAME.messageBoxTypeError;
            case 'success':
                return CSS_CLASS_NAME.messageBoxTypeSuccess;
            case 'warning':
                return CSS_CLASS_NAME.messageBoxTypeWarning;
            case 'information':
                return CSS_CLASS_NAME.messageBoxTypeInformation;
            case 'confirmation':
                return CSS_CLASS_NAME.messageBoxTypeConfirmation;
            default:
                return '';
        }
    }
}
