import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild
} from '@angular/core';

import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';
import { Router } from '@angular/router';
import { CSS_CLASS_NAME, MESSAGE_BOX_CONFIG, MESSAGE_BOX_REF, MessageBoxConfig, MessageBoxRef } from './utils';
import { DialogBase } from '../dialog/base/dialog-base.class';

@Component({
    selector: 'fd-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent extends DialogBase implements OnInit, AfterViewInit, OnDestroy, CssClassBuilder {
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
    // @ContentChild(DialogHeaderComponent)
    // set dialogHeaderConfig(component: DialogHeaderComponent) {
    //     if (component) {
    //         component.dialogConfig = this._messageBoxConfig;
    //     }
    // }
    //
    // /** @hidden */
    // @ContentChild(DialogBodyComponent)
    // set dialogBodyConfig(component: DialogBodyComponent) {
    //     if (component) {
    //         // component.dialogRef = this._messageBoxRef;
    //         // component.dialogConfig = this._messageBoxConfig;
    //     }
    // }
    //
    // /** @hidden */
    // @ContentChild(DialogFooterComponent)
    // set dialogFooterConfig(component: DialogFooterComponent) {
    //     if (component) {
    //         component.dialogConfig = this._messageBoxConfig;
    //     }
    // }

    /** @hidden Whenever dialog should be visible */
    showDialogWindow: boolean;

    /** @hidden */
    private _class = '';

    constructor(
        @Optional() @Inject(MESSAGE_BOX_CONFIG) public _messageBoxConfig: MessageBoxConfig,
        @Optional() @Inject(MESSAGE_BOX_REF) private _messageBoxRef: MessageBoxRef,
        @Optional() router: Router,
        changeDetectorRef: ChangeDetectorRef,
        elementRef: ElementRef
    ) {
        super(router, elementRef, changeDetectorRef, _messageBoxRef, _messageBoxConfig);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
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
            this._messageBoxConfig.hasBackdrop ? CSS_CLASS_NAME.messageBox : '',
            this.showDialogWindow ? CSS_CLASS_NAME.messageBoxActive : '',
            this._class,
            this._messageBoxConfig.backdropClass ? this._messageBoxConfig.backdropClass : ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }
}
