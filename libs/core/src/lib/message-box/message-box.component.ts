import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';
import { Router } from '@angular/router';
import {
    MESSAGE_BOX_CONFIG,
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from './utils/message-box-config.class';

import { MESSAGE_BOX_REF, MessageBoxRef } from './utils/message-box-ref.class';

import { DialogBase } from '../dialog/base/dialog-base.class';
import { dialogFadeNgIf } from '../dialog/utils/dialog.animations';

@Component({
    selector: 'fd-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [dialogFadeNgIf]
})
export class MessageBoxComponent extends DialogBase implements OnInit, OnChanges, AfterViewInit, OnDestroy, CssClassBuilder {
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
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

    /** @hidden If dialog subcomponents didn't receive DialogConfig from Injector, DialogConfig is passed from parent.
     * This is necessary when dialog has been passed as TemplateRef and created as EmbeddedView.
     * In such case parent injector of DialogComponent is the component that DECLARED the TemplateRef.
     **/
    @ContentChildren(MESSAGE_BOX_CONFIGURABLE_ELEMENT)
    set messageBox(elements: QueryList<MessageBoxConfigurableElement>) {
        elements.forEach(element => element._messageBoxConfig = this._messageBoxConfig);
    }

    /** @hidden */
    private _class = '';

    constructor(
        @Optional() @Inject(MESSAGE_BOX_CONFIG) private _messageBoxConfig: MessageBoxConfig,
        @Optional() @Inject(MESSAGE_BOX_REF) private _messageBoxRef: MessageBoxRef,
        @Optional() router: Router,
        changeDetectorRef: ChangeDetectorRef,
        elementRef: ElementRef
    ) {
        super(router, elementRef, changeDetectorRef);
    }

    get _config(): MessageBoxConfig {
        return this._messageBoxConfig;
    }

    get _ref(): MessageBoxRef {
        return this._messageBoxRef;
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
    }

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
            'fd-message-box--active',

            this._messageBoxConfig.hasBackdrop ? 'fd-message-box' : '',
            this._class,
            this._messageBoxConfig.backdropClass ? this._messageBoxConfig.backdropClass : ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }
}
