import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { Subscription } from 'rxjs';

import { applyCssClass, CssClassBuilder, FocusTrapService, RtlService } from '@fundamental-ngx/cdk/utils';

import { dialogFade } from './utils/dialog.animations';
import { DialogConfig } from './utils/dialog-config.class';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogRef } from './utils/dialog-ref.class';
import { DialogBase } from './base/dialog-base.class';
import { DialogTitleDirective } from './directives/dialog-title.directive';

/**
 * Dialog component.
 *
 * ```html
 * <fd-dialog>
 *      <fd-dialog-header></fd-dialog-header>
 *      <fd-dialog-body></fd-dialog-body>
 *      <fd-dialog-footer></fd-dialog-footer>
 * </fd-dialog>
 * ```
 */
@Component({
    selector: 'fd-dialog',
    styleUrls: ['dialog.component.scss'],
    templateUrl: './dialog.component.html',
    host: {
        tabindex: '-1'
    },
    animations: [dialogFade],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent
    extends DialogBase
    implements OnInit, OnChanges, AfterViewInit, OnDestroy, CssClassBuilder
{
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
    }

    /** DialogRef - should be used for Template based Dialog implementation */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('dialogRef')
    set embeddedDialogRef(value: DialogRef) {
        this._dialogRef = value;
    }

    /** DialogConfig - should be used for Template based Dialog implementation */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('dialogConfig')
    set embeddedDialogConfig(value: DialogConfig) {
        this.dialogConfig = value;
    }

    /** @hidden */
    @ViewChild('dialogWindow')
    dialogWindow: ElementRef;

    /** @hidden If dialog sub-components didn't receive DialogConfig from Injector, DialogConfig is passed from parent.
     * This is necessary when dialog has been passed as TemplateRef and created as EmbeddedView.
     * In such case parent injector of DialogComponent is the component that DECLARED the TemplateRef.
     **/
    @ContentChild(DialogHeaderComponent)
    set dialogHeaderConfig(component: DialogHeaderComponent) {
        if (component) {
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden */
    @ContentChild(DialogBodyComponent)
    set dialogBodyConfig(component: DialogBodyComponent) {
        if (component) {
            component.dialogRef = this._dialogRef;
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden */
    @ContentChild(DialogFooterComponent)
    set dialogFooterConfig(component: DialogFooterComponent) {
        if (component) {
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden */
    @ContentChild(DialogTitleDirective)
    set dialogTitle(component: DialogTitleDirective) {
        if (component) {
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden Whenever dialog should be visible */
    showDialogWindow: boolean;

    /** @hidden Whenever dialog is dragged */
    isDragged: boolean;

    /** @hidden */
    private _class = '';

    /** @hidden */
    private _onHidden: Subscription;

    /** @hidden */
    constructor(
        @Optional() public dialogConfig: DialogConfig,
        @Optional() private _dialogRef: DialogRef,
        @Optional() router: Router,
        @Optional() rtlService: RtlService,
        focusTrapService: FocusTrapService,
        changeDetectorRef: ChangeDetectorRef,
        elementRef: ElementRef
    ) {
        super(router, elementRef, changeDetectorRef, rtlService, focusTrapService);
    }

    /** @hidden */
    get _config(): DialogConfig {
        return this.dialogConfig;
    }

    /** @hidden */
    get _ref(): DialogRef {
        return this._dialogRef;
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        this._listenOnHidden();
        this._listenOnClose();
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
        this._onHidden.unsubscribe();
        this._animationState = 'void';
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.dialogConfig.hasBackdrop ? 'fd-dialog' : 'fd-dialog--no-backdrop',
            this.dialogConfig.container !== 'body' || this.dialogConfig.position ? 'fd-dialog--targeted' : '',
            this.showDialogWindow ? 'fd-dialog--active' : '',
            this._class,
            this.dialogConfig.backdropClass ? this.dialogConfig.backdropClass : ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** Handle end of animations, updating the state of the Message Toast. */
    @HostListener('@state.done', ['$event'])
    onAnimationEnd(event: AnimationEvent): void {
        const { fromState, toState } = event;

        console.log(event);

        if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
            this._dialogRef._endClose$.next();
            this._dialogRef._endClose$.complete();
        }
    }

    /** @hidden Listen on Dialog visibility */
    private _listenOnHidden(): void {
        this._onHidden = this._dialogRef.onHide.subscribe((isHidden) => {
            this.showDialogWindow = !isHidden;
            this._animationState = this.showDialogWindow ? 'visible' : 'void';
            this.buildComponentCssClass();
        });
    }

    /**
     * @hidden
     * We need to wait until animation plays, and then send signal to the service to destroy the component.
     */
    private _listenOnClose(): void {
        const callback: () => void = () => (this._animationState = 'void');
        this._dialogRef.afterClosed.subscribe({
            next: () => callback(),
            error: () => callback()
        });
    }
}
