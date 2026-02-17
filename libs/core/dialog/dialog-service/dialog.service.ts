import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Injector, Optional, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { DialogBaseService } from '../base/dialog-base.service';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DialogContentType } from '../dialog.types';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';

/** Service used to create a dialog. */
@Injectable({
    providedIn: 'root'
})
export class DialogService extends DialogBaseService<DialogContainerComponent> {
    /** @hidden */
    private platformId = inject(PLATFORM_ID);
    /** @hidden */
    private readonly htmlElement?: HTMLHtmlElement;

    /** @hidden */
    constructor(
        @Optional() @Inject(DIALOG_DEFAULT_CONFIG) private _defaultConfig: DialogConfig,
        @Optional() private _rtlService: RtlService,
        private _injector: Injector,
        private readonly _overlay: Overlay
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.htmlElement = document.querySelector('html') as HTMLHtmlElement;
        }
    }

    /**
     * Opens a dialog component with provided content.
     * @param content Content of the dialog component.
     * @param dialogConfig Configuration of the dialog component.
     * @param parentInjector Parent injector instance.
     */
    public open<T = any>(
        content: DialogContentType,
        dialogConfig?: DialogConfig<T>,
        parentInjector?: Injector
    ): DialogRef<T> {
        const dialogRef = new DialogRef();
        let previouslyFocusedElement: HTMLElement | null = null;
        if (dialogConfig?.focusTrapped && document.activeElement) {
            previouslyFocusedElement = document.activeElement as HTMLElement;
        }
        if (!parentInjector) {
            parentInjector = this._injector;
        }

        dialogConfig = this._applyDefaultConfig(dialogConfig || {}, this._defaultConfig || new DialogConfig());
        dialogRef.data = dialogConfig.data;

        const injector = Injector.create({
            providers: [
                { provide: DialogConfig, useValue: dialogConfig },
                { provide: DialogRef, useValue: dialogRef },
                { provide: RtlService, useValue: this._rtlService },
                { provide: DialogService, useValue: this }
            ],
            parent: parentInjector
        });

        const overlayRef = this._overlay.create(new OverlayConfig());

        if (dialogConfig.container && dialogConfig.container !== 'body' && typeof dialogConfig.container !== 'string') {
            dialogConfig.container.append(overlayRef.hostElement);
        }
        const portal = new ComponentPortal(DialogContainerComponent, null, injector);
        const componentRef = overlayRef.attach(portal);

        componentRef.instance.childContent = content;
        componentRef.instance.dialogConfig = dialogConfig;

        // Register dialog for tracking (replaces manual push)
        this._registerDialog(componentRef);

        this.htmlElement && (this.htmlElement.style.overflow = 'hidden');
        dialogRef._endClose$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._destroyDialog(componentRef);
            overlayRef.dispose();
            this.htmlElement && (this.htmlElement.style.overflow = '');
            if (dialogConfig?.focusTrapped && previouslyFocusedElement) {
                previouslyFocusedElement.focus();
            }
        });

        return dialogRef;
    }
}
