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
    Injectable,
    InjectionToken,
    Injector,
    OnDestroy,
    StaticProvider,
    TemplateRef,
    Type,
    ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseToastPosition, ToastGlobalConnectedPosition, ToastGlobalPosition } from './base-toast-positions';
import { BaseToastConfig } from './classes/base-toast-config';
import { BaseToastRef } from './classes/base-toast-ref';
import { ToastContainerComponent } from './interfaces/toast-container-component.interface';
import { ToastTextComponent } from './interfaces/toast-text-component.interface';
import { warnOnce } from '../helpers';

@Injectable()
export abstract class BaseToastService<
    P extends BaseToastConfig,
    C extends ToastContainerComponent<P> = ToastContainerComponent<P>
> implements OnDestroy
{
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

    /**
     * @hidden
     */
    protected _toastsMap = new Map<BaseToastPosition, BaseToastRef[]>();

    /** @hidden */
    private _destroy$ = new Subject<void>();

    /** @hidden */
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
     * Opens a Toast with the provided configuration.
     * @param toast accepts string, Component or TemplateRef.
     */
    abstract open<T>(
        toast: string | Type<T> | TemplateRef<T>
    ): BaseToastRef<ToastTextComponent | T | EmbeddedViewRef<T>, P>;

    abstract openFromString(message: string, config: P): BaseToastRef<ToastTextComponent, P>;

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
    hideAll(): void {
        this._toasts.forEach((t) => t.dismiss());
    }

    /**
     * Returns `true` if there are some message toasts currently open. `False` otherwise.
     */
    hasOpenMessageToasts(): boolean {
        return this._toasts.length > 0;
    }

    /**
     * @deprecated.
     * Use `hideAll()` method instead.
     */
    dismissAll(): void {
        warnOnce('dismissAll() is deprecated. Use hideAll() instead.');
        this.hideAll();
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
     * @param positionStrategy Position Strategy
     */
    protected abstract getToastRef<T>(
        containerRef: C,
        overlayRef: OverlayRef,
        positionStrategy: BaseToastPosition
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
        const positionStrategy = config.positionStrategy || this.toastPositionStrategy;
        const { overlay, isAnchor } = this._createOverlay(positionStrategy);
        const containerRef = this.attachToastContainerComponent(overlay, config);
        const toastRef = this.getToastRef<T>(containerRef, overlay, positionStrategy);
        toastRef._defaultPositionStrategy = !config.positionStrategy;
        toastRef._isAnchor = isAnchor;

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

            contentRef.changeDetectorRef.detectChanges();
        }

        const allToasts = this._toastsMap.get(positionStrategy) || [];
        allToasts.push(toastRef);
        this._toasts.push(toastRef);
        this._toastsMap.set(positionStrategy, allToasts);

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
     * @param toastRef Reference to the Toast.
     */
    protected createContentComponentInjector<T>(config: P, toastRef: BaseToastRef<T>): Injector {
        return Injector.create({
            parent: this.injector,
            providers: this.getContentComponentProviders(config, toastRef)
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    /**
     * Animates the old Toast out and the new one in.
     */
    protected animateToast<T>(toastRef: BaseToastRef<T | EmbeddedViewRef<any>, P>): void {
        const positionStrategy = toastRef.positionStrategy;
        // When the toast is dismissed, clear the reference to it.
        toastRef
            .afterDismissed()
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                const allToasts = this._toastsMap.get(positionStrategy) || [];
                allToasts.splice(allToasts.indexOf(toastRef), 1);
                this._toasts.splice(this._toasts.indexOf(toastRef), 1);
                this._toastsMap.set(positionStrategy, allToasts);
                this._refreshOverlayPositions();
            });

        toastRef.containerInstance.enter();
    }

    /**
     * @hidden
     * Creates a new overlay and places it in the correct location.
     */
    private _createOverlay(positionStrategy: BaseToastPosition): { overlay: OverlayRef; isAnchor: boolean } {
        const overlayConfig = new OverlayConfig();
        overlayConfig.scrollStrategy = positionStrategy.scrollPosition || this.overlay.scrollStrategies.reposition();

        const { position, isAnchor } = this._getPositionStrategy(positionStrategy);

        overlayConfig.positionStrategy = position;
        overlayConfig.panelClass = 'fd-toast-overlay';
        return { overlay: this.overlay.create(overlayConfig), isAnchor };
    }

    /**
     * @hidden
     * @returns Initial Position Strategy of the Toast Overlay Reference.
     */
    private _getPositionStrategy(positionStrategy: BaseToastPosition): {
        position: PositionStrategy;
        isAnchor: boolean;
    } {
        const lastOverlay = this._getLastToastWithSamePosition(positionStrategy);

        const globalOverlay = this._toastsMap.get(positionStrategy)?.find(({ _isAnchor }) => _isAnchor);

        if (lastOverlay && globalOverlay) {
            return {
                position: this._composeFlexibleConnectedPosition(
                    lastOverlay.overlayRef.overlayElement,
                    positionStrategy
                ),
                isAnchor: false
            };
        }

        return { position: this._composeGlobalPosition(positionStrategy), isAnchor: true };
    }

    /**
     * @hidden
     * @param needlePosition
     * @private
     */
    private _getLastToastWithSamePosition(needlePosition: BaseToastPosition): BaseToastRef<P, C> | undefined {
        return [...(this._toastsMap.get(needlePosition) || [])]?.reverse()[0];
    }

    /**
     * @hidden
     * @param connectedElm element to connect with.
     * @param positionStrategy Position Strategy
     * @returns Flexible Connected Position Strategy for Overlay Reference.
     */
    private _composeFlexibleConnectedPosition(
        connectedElm: HTMLElement,
        positionStrategy: BaseToastPosition
    ): FlexibleConnectedPositionStrategy {
        positionStrategy = positionStrategy || this.toastPositionStrategy;
        return this.overlay
            .position()
            .flexibleConnectedTo(connectedElm)
            .withPush(false)
            .withPositions([positionStrategy.connected]);
    }

    /**
     * @hidden
     * @returns Default Global Position for Overlay Reference.
     */
    private _composeGlobalPosition(
        positionStrategy: BaseToastPosition
    ): GlobalPositionStrategy | FlexibleConnectedPositionStrategy {
        let position: FlexibleConnectedPositionStrategy | GlobalPositionStrategy;
        if (this._isBoundGlobalPosition(positionStrategy.global)) {
            position = this.overlay
                .position()
                .flexibleConnectedTo(positionStrategy.global.boundTo)
                .withPositions([positionStrategy.global])
                .withPush(false);
        } else {
            position = this.overlay.position().global();
            const globalToastPositionStrategy: ToastGlobalPosition = positionStrategy.global;

            for (const [pos, value] of Object.entries(globalToastPositionStrategy)) {
                switch (pos) {
                    case 'left':
                        position.left(value);
                        break;
                    case 'right':
                        position.right(value);
                        break;
                    case 'bottom':
                        position.bottom(value);
                        break;
                    case 'top':
                        position.top(value);
                        break;
                    case 'center':
                        position.centerHorizontally();
                        break;
                    case 'centerVertically':
                        position.centerVertically();
                        break;
                }
            }
        }

        return position;
    }

    /** @hidden */
    private _refreshOverlayPositions(): void {
        this._toastsMap.forEach((toasts) => {
            this._updateOverlayPositionStrategy(toasts);
        });
    }

    /** @hidden */
    private _updateOverlayPositionStrategy(toasts: BaseToastRef[]): void {
        toasts.forEach((toastRef) => {
            const positionStrategy = this._updatePositionStrategy(toastRef);
            const overlayConfig = toastRef.overlayRef.getConfig();

            toastRef.overlayRef.updatePositionStrategy(positionStrategy);
            overlayConfig.positionStrategy = positionStrategy;
        });
    }

    /**
     * @hidden
     * Updates the position of a current Overlay Reference.
     * @returns New Position Strategy.
     * @param toast Toast Reference
     */
    private _updatePositionStrategy(toast: BaseToastRef): PositionStrategy {
        const positionStrategy = toast._defaultPositionStrategy ? this.toastPositionStrategy : toast.positionStrategy;

        if (toast._isAnchor) {
            return this._composeGlobalPosition(positionStrategy);
        }

        const toasts = this._toastsMap.get(positionStrategy) || [];

        const globalOverlay = toasts?.find(({ _isAnchor }) => _isAnchor);

        if (!globalOverlay) {
            toast._isAnchor = true;
            return this._composeGlobalPosition(positionStrategy);
        }

        // Get Previous overlay item.
        const overlayItemIndex = toasts.findIndex((t) => t === toast);
        const previousOverlay = toasts[overlayItemIndex - 1];
        toast._isAnchor = false;

        return this._composeFlexibleConnectedPosition(previousOverlay.overlayRef.overlayElement, positionStrategy);
    }

    /** @hidden */
    private _isBoundGlobalPosition(position: any): position is ToastGlobalConnectedPosition {
        return !!position.boundTo;
    }
}
