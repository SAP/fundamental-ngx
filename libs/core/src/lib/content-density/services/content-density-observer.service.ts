import { ChangeDetectorRef, ElementRef, Injectable, InjectFlags, Injector } from '@angular/core';
import {
    ContentDensityCallbackFn,
    ContentDensityMode,
    ContentDensityObserverSettings,
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
    private configuration: Required<ContentDensityObserverSettings>;

    /** @hidden */
    private alternativeTo = {
        [ContentDensityMode.COMPACT]: (): ContentDensityMode =>
            this.isSupported(ContentDensityMode.CONDENSED) ? ContentDensityMode.CONDENSED : ContentDensityMode.COZY,
        [ContentDensityMode.CONDENSED]: (): ContentDensityMode =>
            this.isSupported(ContentDensityMode.COMPACT) ? ContentDensityMode.COMPACT : ContentDensityMode.COZY,
        [ContentDensityMode.COZY]: (): ContentDensityMode => ContentDensityMode.COZY // No alternative here, everyone should support it
    };

    private readonly destroy$: Observable<void>;
    private changeDetectorRef: ChangeDetectorRef;
    private contentDensityDirective?: Observable<LocalContentDensityMode>;
    private contentDensityService?: GlobalContentDensityService;

    constructor(private _injector: Injector, private _providedConfig?: ContentDensityObserverSettings) {
        super(
            _injector.get(GlobalContentDensityService, null, InjectFlags.Optional)?.currentContentDensity ||
                _providedConfig?.defaultContentDensity ||
                defaultContentDensityObserverConfigs.defaultContentDensity
        );
        this.configuration = {
            ...defaultContentDensityObserverConfigs,
            ...(_providedConfig || {})
        };
        this.destroy$ = this._injector.get(DestroyedService);
        this.changeDetectorRef = this._injector.get(ChangeDetectorRef);
        this.contentDensityDirective = this._injector.get(CONTENT_DENSITY_DIRECTIVE, undefined, InjectFlags.Optional);
        this.contentDensityService = this._injector.get(GlobalContentDensityService, undefined, InjectFlags.Optional);

        const changesSource$: Observable<ContentDensityMode> = getChangesSource$({
            defaultContentDensity: this.configuration.defaultContentDensity,
            contentDensityDirective: this.contentDensityDirective,
            contentDensityService: this.contentDensityService
        }).pipe(
            map((density: ContentDensityMode) => {
                if (!this.isSupported(density)) {
                    return this.alternativeTo[density]();
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
                this.next(density);
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
