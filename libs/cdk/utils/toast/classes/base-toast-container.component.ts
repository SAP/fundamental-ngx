import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { OverlayRef } from '@angular/cdk/overlay';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, EmbeddedViewRef, viewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastContainerComponent } from '../interfaces/toast-container-component.interface';
import { BaseToastConfig } from './base-toast-config';

let toastUniqueId = 0;

@Directive()
export abstract class BaseToastContainerComponent<P extends BaseToastConfig = BaseToastConfig>
    extends BasePortalOutlet
    implements ToastContainerComponent<P>
{
    /** Method, which is triggered when the Toast component is ready to be shown. Used to trigger animations. */
    abstract enter(): void;

    /** Method, which is triggered when the Toast component is ready to be removed. Used to trigger animations. */
    abstract exit(): void;

    /**
     * @hidden
     * The portal outlet inside this container into which the Toast content will be loaded.
     */
    readonly _portalOutlet = viewChild.required(CdkPortalOutlet);

    /** Min width of the toast component. */
    readonly minWidth: string;

    /** Max width of the toast component. */
    readonly maxWidth: string;

    /** Width of the toast component. */
    readonly width: string;

    /** Min height of the toast component. */
    readonly minHeight: string;

    /** Max height of the toast component. */
    readonly maxHeight: string;

    /** Height of the toast component. */
    readonly height: string;

    /** Subject for notifying that the Toast has finished exiting from view. */
    readonly onExit$: Subject<void> = new Subject();

    /** Subject for notifying that the Toast has finished entering the view. */
    readonly onEnter$: Subject<void> = new Subject();

    /** Overlay reference */
    overlayRef!: OverlayRef;

    /** Aria label. */
    readonly ariaLabel: string | undefined | null;

    /** ID of the Toast. */
    readonly id: string | undefined | null;

    /** @hidden */
    protected constructor(public config: P) {
        super();
        this.minWidth = coerceCssPixelValue(config.minWidth);
        this.maxWidth = coerceCssPixelValue(config.maxWidth);
        this.width = coerceCssPixelValue(config.width);
        this.minHeight = coerceCssPixelValue(config.minHeight);
        this.maxHeight = coerceCssPixelValue(config.maxHeight);
        this.height = coerceCssPixelValue(config.height);
        this.ariaLabel = config.ariaLabel;
        this.id = config.id || 'fd-message-toast-' + toastUniqueId++;
    }

    /**
     * Attaches component to the portal.
     */
    attachComponentPortal<C>(portal: ComponentPortal<C>): ComponentRef<C> {
        return this._portalOutlet().attachComponentPortal(portal);
    }

    /**
     * Attaches Template to the portal.
     * @param portal
     */
    attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
        return this._portalOutlet().attachTemplatePortal(portal);
    }
}
