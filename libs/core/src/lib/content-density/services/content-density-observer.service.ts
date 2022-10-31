import { ChangeDetectorRef, ElementRef, FactorySansProvider, Injectable, InjectFlags, Injector } from '@angular/core';
import {
    ContentDensityCallbackFn,
    ContentDensityObserverTarget,
    LocalContentDensityMode
} from '../content-density.types';
import { BehaviorSubject, distinctUntilChanged, finalize, map, Observable, Subscription, takeUntil, tap } from 'rxjs';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { getChangesSource$ } from '../helpers/get-changes-source.provider';
import { defaultContentDensityObserverConfigs } from '../variables/default-content-density-consumer-config';
import { contentDensityCallbackFactory } from '../helpers/content-density-change-callback-factory';
import { isCompact, isCondensed, isCozy } from '../helpers/density-type-checkers';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';
import { ContentDensityMode } from '../types/content-density.mode';

const isFactoryProvider = (obj: any): obj is FactorySansProvider => !!(obj && (obj as FactorySansProvider).useFactory);

const getDeps = (injector: Injector, defaultContentDensity: FactorySansProvider): Array<any> =>
    (defaultContentDensity.deps || []).map((dep): any => {
        if (Array.isArray(dep)) {
            let type;
            let flags = InjectFlags.Default;
            for (let index = 0; index < dep.length; index++) {
                const flag = dep[index]['__NG_DI_FLAG__'];
                if (typeof flag === 'number') {
                    // eslint-disable-next-line no-bitwise
                    flags |= flag;
                } else {
                    type = dep[index];
                }
            }
            return injector.get(type, undefined, flags);
        }
        return injector.get(dep, undefined, InjectFlags.Default);
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
    const serviceValue = injector.get(GlobalContentDensityService, null, InjectFlags.Optional)?.currentContentDensity;
    if (serviceValue) {
        return serviceValue;
    }
    return getDefaultContentDensity(injector, {
        ...defaultContentDensityObserverConfigs,
        ...(configuration || {})
    });
};

@Injectable()
export class ContentDensityObserver extends BehaviorSubject<ContentDensityMode> {
    /** Stream for getting compact state changes */
    isCompact$: Observable<boolean>;
    /** Stream for getting cozy state changes */
    isCozy$: Observable<boolean>;
    /** Stream for getting condensed state changes */
    isCondensed$: Observable<boolean>;

    /** @hidden */
    private _callbacks: Map<any, ContentDensityCallbackFn> = new Map<any, ContentDensityCallbackFn>();

    /** @hidden */
    private _isCompact: boolean;
    /** @hidden */
    private _isCozy: boolean;
    /** @hidden */
    private _isCondensed: boolean;

    /** @hidden */
    private _compactSubscription: Subscription;
    /** @hidden */
    private _condensedSubscription: Subscription;
    /** @hidden */
    private _cozySubscription: Subscription;

    /** @hidden */
    private readonly configuration: Required<ContentDensityObserverSettings>;

    /** @hidden */
    private alternativeTo = {
        [ContentDensityMode.COMPACT]: (): ContentDensityMode =>
            this.isSupported(ContentDensityMode.CONDENSED) ? ContentDensityMode.CONDENSED : ContentDensityMode.COZY,
        [ContentDensityMode.CONDENSED]: (): ContentDensityMode =>
            this.isSupported(ContentDensityMode.COMPACT) ? ContentDensityMode.COMPACT : ContentDensityMode.COZY,
        [ContentDensityMode.COZY]: (): ContentDensityMode => ContentDensityMode.COZY // No alternative here, everyone should support it
    };

    /** @hidden */
    private readonly destroy$: Observable<void>;
    /** @hidden */
    private changeDetectorRef: ChangeDetectorRef;
    /** @hidden */
    private contentDensityDirective?: Observable<LocalContentDensityMode>;
    /** @hidden */
    private contentDensityService?: GlobalContentDensityService;

    /** @hidden */
    constructor(private _injector: Injector, private _providedConfig?: ContentDensityObserverSettings) {
        super(initialContentDensity(_injector, _providedConfig));
        if (_providedConfig?.debug) {
            console.log({ initialContentDensity: initialContentDensity(_injector, _providedConfig) });
        }
        this.configuration = {
            ...defaultContentDensityObserverConfigs,
            ...(_providedConfig || {})
        };
        this.destroy$ = this._injector.get(DestroyedService);
        this.changeDetectorRef = this._injector.get(ChangeDetectorRef);
        this.contentDensityDirective = this._injector.get(CONTENT_DENSITY_DIRECTIVE, undefined, InjectFlags.Optional);
        this.contentDensityService = this._injector.get(GlobalContentDensityService, undefined, InjectFlags.Optional);

        const changesSource$: Observable<ContentDensityMode> = getChangesSource$({
            defaultContentDensity: getDefaultContentDensity(this._injector, this.configuration),
            contentDensityDirective: this.contentDensityDirective,
            contentDensityService: this.contentDensityService
        }).pipe(
            map((density: ContentDensityMode) => {
                if (this.configuration.debug) {
                    console.log(`ContentDensityObserver: density changed to ${density}`);
                }
                if (!this.isSupported(density)) {
                    try {
                        return this.alternativeTo[density]();
                    } catch (e) {
                        throw new Error(`ContentDensityObserver: density ${density} is not supported`);
                    }
                }
                return density;
            }),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        );
        changesSource$
            .pipe(
                tap((density) => this._callCallbacks(density)),
                finalize(() => this.complete())
            )
            .subscribe((density) => {
                if (this.configuration.debug) {
                    console.log(`ContentDensityObserver: density emmited ${density}`);
                }
                this.next(density);
                this.changeDetectorRef.markForCheck();
            });
        this.isCompact$ = changesSource$.pipe(map(isCompact));
        this.isCozy$ = changesSource$.pipe(map(isCozy));
        this.isCondensed$ = changesSource$.pipe(map(isCondensed));
        if (_providedConfig) {
            this.consume({
                contentDensitySettings: this.configuration,
                elementRef: () => this._injector.get(ElementRef)
            });
        }
    }

    /** Check if the given density is supported */
    isSupported(density: ContentDensityMode): boolean {
        return this.configuration.supportedContentDensity.includes(density);
    }

    /**
     * Sync isCompact. Calls ChangeDetectorRef.markForCheck() on update
     */
    get isCompact(): boolean {
        if (!this._compactSubscription) {
            this._compactSubscription = this._listenToChanges(this.isCompact$, (v) => (this._isCompact = v));
        }
        return this._isCompact;
    }

    /**
     * Sync isCondensed. Calls ChangeDetectorRef.markForCheck() on update
     */
    get isCondensed(): boolean {
        if (!this._condensedSubscription) {
            this._condensedSubscription = this._listenToChanges(this.isCondensed$, (v) => (this._isCondensed = v));
        }
        return this._isCondensed;
    }

    /**
     * Sync isCozy. Calls ChangeDetectorRef.markForCheck() on update
     */
    get isCozy(): boolean {
        if (!this._cozySubscription) {
            this._cozySubscription = this._listenToChanges(this.isCozy$, (v) => (this._isCozy = v));
        }
        return this._isCozy;
    }

    /**
     * Pass consumers callback function, or configuration object to be called on density change
     */
    consume(
        ...consumerConfigs: Array<ContentDensityObserverTarget | ContentDensityCallbackFn>
    ): ContentDensityObserver {
        consumerConfigs.forEach((consumerConfig) => {
            const callback = contentDensityCallbackFactory(consumerConfig);
            this._callbacks.set(consumerConfig, callback);
            callback(this.value);
        });
        return this;
    }

    /**
     * Remove consumer callback from list of callbacks
     */
    removeConsumer(
        ...consumerConfigs: Array<ContentDensityObserverTarget | ContentDensityCallbackFn>
    ): ContentDensityObserver {
        consumerConfigs.forEach((consumerConfig) => {
            this._callbacks.delete(consumerConfig);
        });
        return this;
    }

    /** @hidden */
    private _callCallbacks(density: ContentDensityMode): void {
        this._callbacks.forEach((callback) => callback(density));
    }

    /** @hidden */
    private _listenToChanges(source: Observable<boolean>, callback: (newValue: boolean) => void): Subscription {
        return source
            .pipe(
                tap(callback),
                tap(() => this.changeDetectorRef.markForCheck()),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
