import { map, Observable, Subscription, takeUntil, tap } from 'rxjs';
import { ContentDensityMode } from '../content-density.types';
import { isCompact, isCondensed, isCozy } from '../helpers/density-type-checkers';
import { ChangeDetectorRef } from '@angular/core';

/** Class, which is used for consuming calculated content density state information in components */
export class ContentDensityConsumer extends Observable<ContentDensityMode> {
    /** Stream for getting compact state */
    isCompact$: Observable<boolean>;
    /** Stream for getting cozy state */
    isCozy$: Observable<boolean>;
    /** Stream for getting condensed state */
    isCondensed$: Observable<boolean>;

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
        dataSource: Observable<ContentDensityMode>,
        private destroy$: Observable<void>,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super((subscriber) => {
            const subscription = dataSource.subscribe((density) => {
                subscriber.next(density);
            });
            return () => {
                subscription.unsubscribe();
            };
        });

        this.isCompact$ = dataSource.pipe(map(isCompact));
        this.isCozy$ = dataSource.pipe(map(isCozy));
        this.isCondensed$ = dataSource.pipe(map(isCondensed));
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
     * Sync isCondensed. Calls ChangeDetectorRef.markForCheck() on update
     */
    get isCozy(): boolean {
        if (!this._cozySubscription) {
            this._cozySubscription = this._listenToChanges(this.isCozy$, (v) => (this._isCozy = v));
        }
        return this._isCozy;
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
