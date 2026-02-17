import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Subscription } from 'rxjs';

import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

import { A11yModule } from '@angular/cdk/a11y';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/overlay';

import { ResizeDirective, ResizeHandleDirective } from '@fundamental-ngx/cdk/utils';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { DialogBase } from './base/dialog-base.class';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogTitleDirective } from './directives/dialog-title.directive';
import { DialogConfig } from './utils/dialog-config.class';
import { DialogRef } from './utils/dialog-ref.class';

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
    styleUrl: 'dialog.component.scss',
    templateUrl: './dialog.component.html',
    host: {
        tabindex: '-1'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [contentDensityObserverProviders({ alwaysAddModifiers: true })],
    imports: [
        ResizeDirective,
        A11yModule,
        CdkDrag,
        CdkScrollable,
        ScrollbarDirective,
        ResizeHandleDirective,
        CdkDragHandle
    ]
})
export class DialogComponent
    extends DialogBase<DialogRef>
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

    get embeddedDialogRef(): DialogRef {
        return this._dialogRef;
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

    /**
     * @hidden
     * Whether the Dialog in full-screen mode.
     */
    _fullScreen = false;

    /** @hidden */
    private _class = '';

    /** @hidden */
    private _onHidden: Subscription;

    /** @hidden */
    constructor(
        @Optional() public dialogConfig: DialogConfig,
        @Optional() private _dialogRef: DialogRef
    ) {
        super();
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
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.dialogConfig.hasBackdrop ? 'fd-dialog' : 'fd-dialog--no-backdrop',
            this.dialogConfig.container !== 'body' || this.dialogConfig.position ? 'fd-dialog--targeted' : '',
            this.showDialogWindow ? 'fd-dialog--active' : '',
            this.dialogConfig.settings ? 'fd-settings' : '',
            this._class,
            this.dialogConfig.backdropClass ? this.dialogConfig.backdropClass : ''
        ];
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnHidden();
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenOnHidden();
        this._listenOnFullScreen();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this._onHidden) {
            this._onHidden.unsubscribe();
        }
    }

    /** @hidden */
    private _listenOnFullScreen(): void {
        this._ref.fullScreen.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((isFullScreen) => {
            this._fullScreen = isFullScreen;
            this.adjustResponsivePadding();
        });
    }

    /** @hidden Listen on Dialog visibility */
    private _listenOnHidden(): void {
        if (this._onHidden) {
            this._onHidden.unsubscribe();
        }
        this._onHidden = this._dialogRef.onHide.subscribe((isHidden) => {
            this.showDialogWindow = !isHidden;
            this.buildComponentCssClass();

            if (!this._focusTrapId) {
                return;
            }
            const focusTrapInstance = this._focusTrapService.getFocusTrapInstance(this._focusTrapId);
            if (isHidden) {
                focusTrapInstance?.pause();
            } else {
                focusTrapInstance?.unpause();
            }
        });
    }
}
