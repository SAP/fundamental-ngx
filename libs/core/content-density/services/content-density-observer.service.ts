import {
    computed,
    DestroyRef,
    effect,
    ElementRef,
    FactorySansProvider,
    inject,
    Injectable,
    Injector,
    Renderer2,
    signal,
    WritableSignal
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, Observer, Subscription } from 'rxjs';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';
import { ContentDensityObserverTarget } from '../content-density.types';
import { getChangesSource } from '../helpers/get-changes-source.provider';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { ContentDensityMode } from '../types/content-density.mode';
import { defaultContentDensityObserverConfigs } from '../variables/default-content-density-consumer-config';

const isFactoryProvider = (obj: any): obj is FactorySansProvider => !!(obj && (obj as FactorySansProvider).useFactory);

const getDeps = (injector: Injector, defaultContentDensity: FactorySansProvider): Array<any> =>
    (defaultContentDensity.deps || []).map((dep): any => {
        if (Array.isArray(dep)) {
            let type;
            let flags = {};
            for (let index = 0; index < dep.length; index++) {
                const flag = dep[index]['__NG_DI_FLAG__'];
                if (typeof flag === 'number') {
                    flags = { ...flags, flag };
                } else {
                    type = dep[index];
                }
            }
            return injector.get(type, undefined, flags);
        }
        return injector.get(dep, undefined, {});
    });

const getDefaultContentDensity = (
    injector: Injector,
    configuration: Required<ContentDensityObserverSettings>
): ContentDensityMode => {
    if (typeof configuration.defaultContentDensity === 'string') {
        return configuration.defaultContentDensity as ContentDensityMode;
    }
    if (isFactoryProvider(configuration.defaultContentDensity)) {
        const deps = getDeps(injector, configuration.defaultContentDensity);
        return configuration.defaultContentDensity.useFactory(...deps);
    }
    return injector.get(configuration.defaultContentDensity, undefined, undefined);
};

const initialContentDensity = (
    injector: Injector,
    configuration?: ContentDensityObserverSettings
): ContentDensityMode => {
    const serviceValue = injector.get(GlobalContentDensityService, null, { optional: true })?.currentContentDensity;
    if (serviceValue) {
        return serviceValue;
    }
    return getDefaultContentDensity(injector, {
        ...defaultContentDensityObserverConfigs,
        ...(configuration || {})
    });
};

/**
 * Service for observing and managing content density in components.
 *
 * Provides signal-based API for reactive content density tracking.
 */
@Injectable()
export class ContentDensityObserver {
    /** Current content density as a readonly signal */
    readonly contentDensity: ReturnType<WritableSignal<ContentDensityMode>['asReadonly']>;

    /** Whether content density is compact (signal) */
    readonly isCompactSignal: ReturnType<typeof computed<boolean>>;

    /** Whether content density is cozy (signal) */
    readonly isCozySignal: ReturnType<typeof computed<boolean>>;

    /** Whether content density is condensed (signal) */
    readonly isCondensedSignal: ReturnType<typeof computed<boolean>>;

    /**
     * Current content density signal
     * @deprecated Use contentDensity() instead
     */
    readonly contentDensity$: ReturnType<WritableSignal<ContentDensityMode>['asReadonly']>;

    /**
     * Observable for compact state changes
     * @deprecated Use isCompactSignal signal instead
     */
    readonly isCompact$: Observable<boolean>;

    /**
     * Observable for cozy state changes
     * @deprecated Use isCozySignal signal instead
     */
    readonly isCozy$: Observable<boolean>;

    /**
     * Observable for condensed state changes
     * @deprecated Use isCondensedSignal signal instead
     */
    readonly isCondensed$: Observable<boolean>;

    /**
     * Observable of content density changes
     * @deprecated Use contentDensity signal instead
     */
    readonly contentDensity$$: Observable<ContentDensityMode>;

    /** Configuration for this observer */
    readonly config: ContentDensityObserverSettings;

    private readonly _contentDensity: WritableSignal<ContentDensityMode>;

    private readonly _changesSource: ReturnType<typeof computed<ContentDensityMode>>;

    private readonly _destroyRef = inject(DestroyRef);

    private readonly _alternativeTo = {
        [ContentDensityMode.COMPACT]: (): ContentDensityMode =>
            this._isSupported(ContentDensityMode.CONDENSED) ? ContentDensityMode.CONDENSED : ContentDensityMode.COZY,
        [ContentDensityMode.CONDENSED]: (): ContentDensityMode =>
            this._isSupported(ContentDensityMode.COMPACT) ? ContentDensityMode.COMPACT : ContentDensityMode.COZY,
        [ContentDensityMode.COZY]: (): ContentDensityMode => ContentDensityMode.COZY // No alternative here, everyone should support it
    };

    private _globalContentDensityService = inject(GlobalContentDensityService, {
        optional: true
    });

    private _contentDensityDirective = inject(CONTENT_DENSITY_DIRECTIVE, {
        optional: true
    });

    private _parentContentDensityObserver = inject(ContentDensityObserver, {
        optional: true,
        skipSelf: true
    });

    private _renderer: Renderer2 | null = inject(Renderer2);

    private _elementRef: ElementRef<any> | null = inject(ElementRef);

    private _elements = [this._elementRef];

    /**
     * Current content density value
     * @deprecated Use contentDensity() signal instead
     */
    get value(): ContentDensityMode {
        return this._contentDensity();
    }

    /**
     * Whether content density is compact
     * @deprecated Use isCompactSignal() signal instead
     */
    get isCompact(): boolean {
        return this.isCompactSignal();
    }

    /**
     * Whether content density is cozy
     * @deprecated Use isCozySignal() signal instead
     */
    get isCozy(): boolean {
        return this.isCozySignal();
    }

    /**
     * Whether content density is condensed
     * @deprecated Use isCondensedSignal() signal instead
     */
    get isCondensed(): boolean {
        return this.isCondensedSignal();
    }

    constructor(_injector: Injector, _providedConfig?: ContentDensityObserverSettings) {
        // Initialize internal signal with resolved initial density
        const resolvedInitialDensity = initialContentDensity(_injector, _providedConfig);
        this._contentDensity = signal<ContentDensityMode>(resolvedInitialDensity);

        // Public readonly signal
        this.contentDensity = this._contentDensity.asReadonly();

        // Computed boolean signals
        this.isCompactSignal = computed(() => this._contentDensity() === ContentDensityMode.COMPACT);
        this.isCozySignal = computed(() => this._contentDensity() === ContentDensityMode.COZY);
        this.isCondensedSignal = computed(() => this._contentDensity() === ContentDensityMode.CONDENSED);

        // Backward compatible signal aliases
        this.contentDensity$ = this.contentDensity;

        // Backward compatible observables
        this.isCompact$ = toObservable(this.isCompactSignal, { injector: _injector });
        this.isCozy$ = toObservable(this.isCozySignal, { injector: _injector });
        this.isCondensed$ = toObservable(this.isCondensedSignal, { injector: _injector });
        this.contentDensity$$ = toObservable(this._contentDensity, { injector: _injector });

        // Set up config
        this.config = {
            ...defaultContentDensityObserverConfigs,
            ...(this._parentContentDensityObserver?.config ?? {}),
            ...(_providedConfig || {})
        };

        // Get the changes source as a signal (fully signal-based now)
        this._changesSource = getChangesSource({
            defaultContentDensity: resolvedInitialDensity,
            contentDensityDirective: this._contentDensityDirective?.densityMode,
            contentDensityService: this._globalContentDensityService ?? undefined,
            parentContentDensityObserver: this.config.restrictChildContentDensity
                ? this._parentContentDensityObserver?.contentDensity
                : undefined
        });

        // React to changes with effect
        effect(() => {
            const rawDensity = this._changesSource();
            const density = this._validateAndFallback(rawDensity);
            if (density !== this._contentDensity()) {
                this._contentDensity.set(density);
                this._applyClass();
            }
        });

        // Apply initial CSS class
        this._applyClass();

        // Register cleanup on destroy
        this._destroyRef.onDestroy(() => {
            this._cleanup();
            if (this.config.debug) {
                console.warn('ContentDensityObserver: destroyed');
            }
        });
    }

    /**
     * Add consumers to observe content density changes
     * @deprecated Use signal bindings instead
     */
    consume(...consumers: ContentDensityObserverTarget[]): void {
        this._elements.concat(...consumers.map((c) => c.elementRef));
    }

    /**
     * Completes the observer and cleans up resources
     * @deprecated Cleanup is automatic via DestroyRef
     */
    complete(): void {
        this._cleanup();
    }

    /**
     * Returns an observable of content density changes
     * @deprecated Use contentDensity signal instead
     */
    asObservable(): Observable<ContentDensityMode> {
        return this.contentDensity$$;
    }

    /**
     * Subscribe to content density changes
     * @deprecated Use contentDensity signal instead
     */
    subscribe(observer?: Partial<Observer<ContentDensityMode>>): Subscription {
        return this.contentDensity$$.subscribe(observer);
    }

    /**
     * Remove a consumer from the observer
     * @deprecated Use signal bindings instead
     */
    removeConsumer(consumer: ContentDensityObserverTarget): void {
        this._elements.splice(this._elements.indexOf(consumer.elementRef), 1);
    }

    private _validateAndFallback(density: ContentDensityMode): ContentDensityMode {
        if (this.config.debug) {
            console.warn(`ContentDensityObserver: density changed to ${density}`);
        }
        if (!this._isSupported(density)) {
            try {
                if (this.config.debug) {
                    console.warn(
                        `ContentDensityObserver: ${density} is not supported. Failing back to alternative one.`
                    );
                }
                return this._alternativeTo[density]();
            } catch {
                throw new Error(`ContentDensityObserver: density ${density} is not supported`);
            }
        }
        return density;
    }

    private _cleanup(): void {
        this._parentContentDensityObserver = null;
        this._contentDensityDirective = null;
        this._globalContentDensityService = null;
        this._elementRef = null;
        this._renderer = null;
        this._elements = [];
    }

    private _applyClass(): void {
        if (!this.config?.modifiers) {
            return;
        }
        const modifiers = this.config.modifiers;
        const currentDensity = this._contentDensity();

        const parentContentDensityEqual = this._parentContentDensityObserver?.value === currentDensity;

        this._elements.forEach((element) => {
            Object.values(modifiers).forEach((className) => {
                this._renderer?.removeClass(element?.nativeElement, className);
            });

            // Apply/remove UI5 compact marker attribute
            this._applyUi5Marker(element?.nativeElement, currentDensity, parentContentDensityEqual);

            // Simply remove all modifiers from current element. Content density state is covered by parent element.
            if (parentContentDensityEqual && !this.config.alwaysAddModifiers) {
                return;
            }
            const modifierClass = modifiers[currentDensity];
            if (modifierClass) {
                this._renderer?.addClass(element?.nativeElement, modifierClass);
            }
        });
    }

    /**
     * Apply or remove UI5 Web Components compact marker.
     * UI5 Web Components only support cozy (default) and compact modes.
     * Both COMPACT and CONDENSED fundamental-ngx modes map to UI5 compact.
     */
    private _applyUi5Marker(
        nativeElement: HTMLElement | undefined,
        currentDensity: ContentDensityMode,
        parentContentDensityEqual: boolean
    ): void {
        if (!this.config.ui5Markers?.enabled || !nativeElement || !this._renderer) {
            return;
        }

        const ui5CompactAttribute = 'data-ui5-compact-size';

        // Remove attribute if parent already has the same density (unless alwaysAddModifiers)
        if (parentContentDensityEqual && !this.config.alwaysAddModifiers) {
            this._renderer.removeAttribute(nativeElement, ui5CompactAttribute);
            return;
        }

        // UI5 only has cozy (default) and compact modes
        // Map: COMPACT -> compact, CONDENSED -> compact, COZY -> remove attribute
        const isUi5Compact =
            currentDensity === ContentDensityMode.COMPACT || currentDensity === ContentDensityMode.CONDENSED;

        if (isUi5Compact) {
            this._renderer.setAttribute(nativeElement, ui5CompactAttribute, '');
        } else {
            this._renderer.removeAttribute(nativeElement, ui5CompactAttribute);
        }
    }

    private _isSupported(density: ContentDensityMode): boolean {
        return this.config.supportedContentDensity?.includes(density) ?? false;
    }
}
