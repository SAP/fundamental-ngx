import { ComponentRef, Directive, EmbeddedViewRef, ViewChild } from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { coerceCssPixel } from '../../decorators';
import { Nullable } from '../../models/nullable';
import { BaseToastConfig } from './base-toast-config';
import { ToastContainerComponent } from '../interfaces/toast-container-component.interface';

let toastUniqueId = 0;

@Directive()
export abstract class BaseToastContainerComponent<P extends BaseToastConfig = BaseToastConfig>
    extends BasePortalOutlet
    implements ToastContainerComponent<P>
{
    /**
     * @hidden
     * The portal outlet inside this container into which the Toast content will be loaded.
     */
    @ViewChild(CdkPortalOutlet, { static: true })
    _portalOutlet!: CdkPortalOutlet;

    /** Subject for notifying that the Toast has finished exiting from view. */
    readonly onExit$: Subject<void> = new Subject();

    /** Subject for notifying that the Toast has finished entering the view. */
    readonly onEnter$: Subject<void> = new Subject();

    /** Overlay reference */
    overlayRef!: OverlayRef;

    /** Min width of the toast component. */
    @coerceCssPixel
    minWidth?: string | number | null;

    /** Max width of the toast component. */
    @coerceCssPixel
    maxWidth?: string | number | null;

    /** Width of the toast component. */
    @coerceCssPixel
    width?: string | number | null;

    /** Min height of the toast component. */
    @coerceCssPixel
    minHeight?: string | number | null;

    /** Max height of the toast component. */
    @coerceCssPixel
    maxHeight?: string | number | null;

    /** Height of the toast component. */
    @coerceCssPixel
    height?: string | number | null;

    /** Aria label. */
    ariaLabel: Nullable<string>;

    /** ID of the Toast. */
    id: Nullable<string>;

    /** @hidden */
    protected constructor(public config: P) {
        super();
        this.minWidth = this.config.minWidth;
        this.maxWidth = this.config.maxWidth;
        this.width = this.config.width;
        this.minHeight = this.config.minHeight;
        this.maxHeight = this.config.maxHeight;
        this.height = this.config.height;
        this.ariaLabel = this.config.ariaLabel;
        this.id = this.config.id || 'fd-message-toast-' + toastUniqueId++;
    }

    /**
     * Attaches component to the portal.
     */
    attachComponentPortal<C>(portal: ComponentPortal<C>): ComponentRef<C> {
        return this._portalOutlet.attachComponentPortal(portal);
    }

    /**
     * Attaches Template to the portal.
     * @param portal
     */
    attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
        return this._portalOutlet.attachTemplatePortal(portal);
    }

    /** Method, which is triggered when the Toast component is ready to be shown. Used to trigger animations. */
    abstract enter(): void;

    /** Method, which is triggered when the Toast component is ready to be removed. Used to trigger animations. */
    abstract exit(): void;
}
