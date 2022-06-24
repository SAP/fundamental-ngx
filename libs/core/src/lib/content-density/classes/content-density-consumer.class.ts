import { BehaviorSubject, distinctUntilChanged, finalize, map, Observable, Subscription, takeUntil, tap } from 'rxjs';
import { ContentDensityCallbackFn, ContentDensityObserverTarget, ContentDensityMode } from '../content-density.types';
import { isCompact, isCondensed, isCozy } from '../helpers/density-type-checkers';
import { ChangeDetectorRef } from '@angular/core';
import { contentDensityCallbackFactory } from '../helpers/content-density-change-callback-factory';

/** Class, which is used for consuming calculated content density state information in components */
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
    constructor(
        initialValue: ContentDensityMode,
        dataSource: Observable<ContentDensityMode>,
        private destroy$: Observable<void>,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super(initialValue);
        const source$ = dataSource.pipe(distinctUntilChanged(), takeUntil(this.destroy$));
        source$
            .pipe(
                tap((density) => this._callCallbacks(density)),
                finalize(() => this.complete())
            )
            .subscribe((density) => {
                this.next(density);
            });
        this.isCompact$ = source$.pipe(map(isCompact));
        this.isCozy$ = source$.pipe(map(isCozy));
        this.isCondensed$ = source$.pipe(map(isCondensed));
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
