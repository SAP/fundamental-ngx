import {
    ComponentType,
    FlexibleConnectedPositionStrategy,
    GlobalPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef,
    PositionStrategy
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
    ComponentRef,
    EmbeddedViewRef,
    InjectionToken,
    Injector,
    StaticProvider,
    TemplateRef,
    Type,
    ViewContainerRef
} from '@angular/core';
import { BaseToastPosition } from './base-toast-positions';
import { BaseToastConfig } from './classes/base-toast-config';
import { BaseToastRef } from './classes/base-toast-ref';
import { ToastContainerComponent } from './interfaces/toast-container-component.interface';
import { ToastTextComponent } from './interfaces/toast-text-component.interface';

export abstract class BaseToastService<
    P extends BaseToastConfig,
    C extends ToastContainerComponent<P> = ToastContainerComponent<P>
> {
    /** Component for simple text toast. */
    protected abstract toastTextComponent: Type<ToastTextComponent>;
    /** Component for Toast Container. */
    protected abstract toastContainerComponent: Type<C>;
    /** Injection token for Toast Data. */
    protected abstract toastDataInjectionToken: InjectionToken<any>;
    /** Toast Position Strategy. */
    protected abstract toastPositionStrategy: BaseToastPosition;
    /** Toast default config. */
    protected abstract defaultConfig: P;

    /**
     * @hidden
     * Array of all current toasts.
     */
    protected _toasts: BaseToastRef[] = [];

    protected constructor(public overlay: Overlay, public injector: Injector) {}

    /**
     * Gets Toast Container providers.
     * @param config Toast Config.
     */
    protected abstract getContainerComponentProviders(config: P): StaticProvider[];

    /**
     * Gets Toast Content providers.
     * @param config Toast Config.
     * @param toastRef Toast Reference.
     */
    protected abstract getContentComponentProviders<T>(config: P, toastRef: BaseToastRef<T>): StaticProvider[];

    /**
     * Opens a Toast with provided configuration.
     * @param args Configuration arguments.
     */
    abstract open(...args: any[]): BaseToastRef<ToastTextComponent, P>;

    /**
     * Opens a Toast with provided component inside.
     * @param component Component to render inside a Toast.
     * @param config Toast configuration.
     * @returns Toast reference.
     */
    abstract openFromComponent<T>(component: Type<T>, config: P): BaseToastRef<T, P>;

    /**
     * Opens a Toast with provided Template Reference.
     * @param template Template Reference to render inside a Toast.
     * @param config Toast configuration.
     * @returns Toast reference.
     */
    abstract openFromTemplate(template: TemplateRef<any>, config: P): BaseToastRef<EmbeddedViewRef<any>>;

    /**
     * Dismisses all Toasts.
     */
    dismissAll(): void {
        this._toasts.forEach((t) => t.dismiss());
    }

    /**
     * Sets new position strategy for all Toast items.
     * @param newStrategy New Position Strategy
     */
    setNewPositionStrategy(newStrategy: BaseToastPosition): void {
        if (newStrategy === this.toastPositionStrategy) {
            return;
        }

        this.toastPositionStrategy = newStrategy;

        this._refreshOverlayPositions();
    }

    /**
     * Creates Toast Reference for provided container and overlay.
     * @param containerRef Container reference.
     * @param overlayRef Overlay Reference.
     */
    protected abstract getToastRef<T>(
        containerRef: C,
        overlayRef: OverlayRef
    ): BaseToastRef<T | EmbeddedViewRef<any>, P>;

    /**
     * @hidden
     * Places a new component or a template as the content of the Toast container.
     */
    protected _attach<T>(
        content: ComponentType<T> | TemplateRef<T>,
        userConfig?: P
    ): BaseToastRef<T | EmbeddedViewRef<any>, P> {
        const config = { ...this.defaultConfig, ...userConfig };
        const overlayRef = this._createOverlay();
        const containerRef = this.attachToastContainerComponent(overlayRef, config);
        const toastRef = this.getToastRef<T>(containerRef, overlayRef);

        if (content instanceof TemplateRef) {
            // TemplatePortal requires viewContainer ref
            const viewRef = null as any as ViewContainerRef;
            const portal = new TemplatePortal(content, viewRef, { $implicit: config, toastRef } as any);

            toastRef.instance = containerRef.attachTemplatePortal(portal);
        } else {
            const injector = this.createContentComponentInjector(config, toastRef);
            const portal = new ComponentPortal(content, undefined, injector);
            const contentRef = containerRef.attachComponentPortal<T>(portal);

            // We can't pass this via the injector, because the injector is created earlier.
            toastRef.instance = contentRef.instance;
        }

        this._toasts.push(toastRef);

        this.animateToast<T>(toastRef);

        return toastRef;
    }

    /**
     * Attaches the Toast container component to the overlay.
     */
    protected attachToastContainerComponent(overlayRef: OverlayRef, config: P): C {
        const injector = Injector.create({
            parent: this.injector,
            providers: this.getContainerComponentProviders(config)
        });

        const containerPortal = new ComponentPortal(this.toastContainerComponent, null, injector);
        const containerRef: ComponentRef<C> = overlayRef.attach(containerPortal);

        containerRef.instance.config = config;
        containerRef.instance.overlayRef = overlayRef;

        return containerRef.instance;
    }

    /**
     * Creates an injector to be used inside a Toast component.
     * @param config Config that was used to create the Toast.
     * @param toastRef Reference to the Toastr.
     */
    protected createContentComponentInjector<T>(config: P, toastRef: BaseToastRef<T>): Injector {
        return Injector.create({
            parent: this.injector,
            providers: this.getContentComponentProviders(config, toastRef)
        });
    }

    /**
     * Animates the old Toast out and the new one in.
     */
    protected animateToast<T>(toastRef: BaseToastRef<T | EmbeddedViewRef<any>, P>): void {
        // When the toast is dismissed, clear the reference to it.
        toastRef.afterDismissed().subscribe(() => {
            this._toasts.splice(this._toasts.indexOf(toastRef), 1);
            this._refreshOverlayPositions();
        });

        toastRef.containerInstance.enter();
    }

    /**
     * @hidden
     * Creates a new overlay and places it in the correct location.
     */
    private _createOverlay(): OverlayRef {
        const overlayConfig = new OverlayConfig();

        overlayConfig.positionStrategy = this._getPositionStrategy();
        overlayConfig.panelClass = 'fn-toast-overlay';

        return this.overlay.create(overlayConfig);
    }

    /**
     * @hidden
     * @returns Initial Position Strategy of the Toast Overlay Reference.
     */
    private _getPositionStrategy(): PositionStrategy {
        const lastOverlay = this._toasts.length > 0 ? this._toasts[this._toasts.length - 1] : null;

        const globalOverlay = this._toasts.find(({ overlayRef }) => {
            const config = overlayRef.getConfig();

            return config.positionStrategy instanceof GlobalPositionStrategy;
        });

        if (lastOverlay && globalOverlay) {
            return this._composeFlexibleConnectedPosition(lastOverlay.overlayRef.overlayElement);
        }

        return this._composeGlobalPosition();
    }

    /**
     * @hidden
     * @param connectedElm element to connect with.
     * @returns Flexible Connected Position Strategy for Overlay Reference.
     */
    private _composeFlexibleConnectedPosition(connectedElm: HTMLElement): FlexibleConnectedPositionStrategy {
        return this.overlay
            .position()
            .flexibleConnectedTo(connectedElm)
            .withPush(false)
            .withPositions([this.toastPositionStrategy.connected]);
    }

    /**
     * @hidden
     * @returns Default Global Position for Overlay Reference.
     */
    private _composeGlobalPosition(): GlobalPositionStrategy {
        const globalPosition = this.overlay.position().global();

        for (const [position, value] of Object.entries(this.toastPositionStrategy.global)) {
            switch (position) {
                case 'left':
                    globalPosition.left(value);
                    break;
                case 'right':
                    globalPosition.right(value);
                    break;
                case 'bottom':
                    globalPosition.bottom(value);
                    break;
                case 'top':
                    globalPosition.top(value);
                    break;
                case 'center':
                    globalPosition.centerHorizontally();
                    break;
            }
        }

        return globalPosition;
    }

    /** @hidden */
    private _refreshOverlayPositions(): void {
        this._toasts.forEach((toastRef) => {
            const positionStrategy = this._updatePositionStrategy(toastRef.overlayRef);
            const overlayConfig = toastRef.overlayRef.getConfig();

            toastRef.overlayRef.updatePositionStrategy(positionStrategy);
            overlayConfig.positionStrategy = positionStrategy;

            return toastRef;
        });
    }

    /**
     * @hidden
     * Updates the position of a current Overlay Reference.
     * @param overlay Overlay reference which position needs to be updated.
     * @returns New Position Strategy.
     */
    private _updatePositionStrategy(overlay: OverlayRef): PositionStrategy {
        const config = overlay.getConfig();

        if (config.positionStrategy instanceof GlobalPositionStrategy) {
            return this._composeGlobalPosition();
        }

        const globalOverlay = this._toasts.find(({ overlayRef }) => {
            const overlayConfig = overlayRef.getConfig();

            return overlayConfig.positionStrategy instanceof GlobalPositionStrategy;
        });

        if (!globalOverlay) {
            return this._composeGlobalPosition();
        }

        // Get Previous overlay item.
        const overlayItemIndex = this._toasts.findIndex(({ overlayRef }) => overlayRef === overlay);
        const previousOverlay = this._toasts[overlayItemIndex - 1];

        return this._composeFlexibleConnectedPosition(previousOverlay.overlayRef.overlayElement);
    }
}
