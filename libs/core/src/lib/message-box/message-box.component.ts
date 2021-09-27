import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { applyCssClass, CssClassBuilder, FocusTrapService, RtlService } from '@fundamental-ngx/core/utils';
import { DialogBase, dialogFadeNgIf } from '@fundamental-ngx/core/dialog';

import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from './utils/message-box-config.class';
import { MessageBoxRef } from './utils/message-box-ref.class';
import { CSS_CLASS_NAME } from './utils/const';

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
    styleUrls: ['./message-box.component.scss'],
    host: { 
        tabindex: '-1',
        role: 'dialog'
     },
    encapsulation: ViewEncapsulation.None,
    animations: [dialogFadeNgIf]
})
export class MessageBoxComponent extends DialogBase implements OnInit, OnChanges, AfterViewInit, OnDestroy, CssClassBuilder {
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
    }

    /** MessageBoxRef - should be used for Template based Dialog implementation  */
    @Input('messageBoxRef')
    set embeddedMessageBoxRef(value: MessageBoxRef) {
        this._messageBoxRef = value;
    }

    /** MessageBoxConfig - should be used for Template based Dialog implementation  */
    @Input('messageBoxConfig')
    set embeddedMessageBoxConfig(value: MessageBoxConfig) {
        this._messageBoxConfig = value;
    }

    /** @hidden */
    @ViewChild('dialogWindow')
    dialogWindow: ElementRef;

    /** @hidden If message box sub-components didn't receive MessageBoxConfig from Injector, MessageBoxConfig is passed
     * from parent. This is necessary when message box has been passed as TemplateRef and created as EmbeddedView.
     * In such case parent injector of MessageBoxComponent is the component that DECLARED the TemplateRef.
     **/
    @ContentChildren(MESSAGE_BOX_CONFIGURABLE_ELEMENT)
    set messageBox(elements: QueryList<MessageBoxConfigurableElement>) {
        elements.forEach(element => element.messageBoxConfig = this._messageBoxConfig);
    }

    /** @hidden */
    private _class = '';

    /** @hidden */
    constructor(
        @Optional() public _messageBoxConfig: MessageBoxConfig,
        @Optional() private _messageBoxRef: MessageBoxRef,
        @Optional() router: Router,
        @Optional() rtlService: RtlService,
        focusTrapService: FocusTrapService,
        changeDetectorRef: ChangeDetectorRef,
        elementRef: ElementRef
    ) {
        super(router, elementRef, changeDetectorRef, rtlService, focusTrapService);
    }

    /** @hidden */
    get _config(): MessageBoxConfig {
        return this._messageBoxConfig;
    }

    /** @hidden */
    get _ref(): MessageBoxRef {
        return this._messageBoxRef;
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
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
    elementRef(): ElementRef {
        return this._elementRef;
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
