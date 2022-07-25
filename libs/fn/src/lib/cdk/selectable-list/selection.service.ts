import { ChangeDetectorRef, Injectable, OnDestroy, QueryList } from '@angular/core';
import { coerceArray } from '@angular/cdk/coercion';
import { combineLatest, merge, Observable, ReplaySubject, Subject, switchMap } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, takeUntil, tap } from 'rxjs/operators';
import equal from 'fast-deep-equal';
import { SelectableItemToken } from './selectable-item.token';
import { SelectableListValueType, SelectComponentRootToken } from './select-component-root.token';

@Injectable()
export class SelectionService<ValueType = any> implements OnDestroy {
    value$: Observable<SelectableListValueType<ValueType>>;

    /** @hidden */
    private _items$!: Observable<SelectableItemToken[]>;
    /** @hidden */
    private _value$ = new ReplaySubject<SelectableListValueType<ValueType>>(1);
    /** @hidden */
    private _normalizedValue$: Observable<ValueType[]>;
    /** @hidden */
    private _rootComponent!: SelectComponentRootToken<ValueType>;
    /** @hidden */
    private _destroy$ = new Subject<void>();
    /** @hidden */
    private _clear$ = new Subject<void>();
    /** @hidden */
    private _value: ValueType[] = [];

    /** @hidden */
    constructor(private _cd: ChangeDetectorRef) {
        this._normalizedValue$ = this._value$.pipe(
            distinctUntilChanged(equal),
            map((v) => coerceArray<ValueType>(v)),
            map((value) => (this._isMultipleMode ? value : [value[0]])),
            map((coerced: ValueType[]) => coerced.filter(Boolean))
        );
        this._normalizedValue$.pipe(takeUntil(this._destroy$)).subscribe((val) => (this._value = val));
        this.value$ = this._normalizedValue$.pipe(
            map((v) => this._getProperValues(v as SelectableListValueType<ValueType>)),
            shareReplay(1)
        );
    }

    /**
     * Register main select component, which holds config
     * */
    registerRootComponent(rootComponent: SelectComponentRootToken<ValueType>): void {
        this._rootComponent = rootComponent;
    }

    /**
     * Clear listeners
     */
    clear(): void {
        this._clear$.next();
    }

    /**
     * Initialize watcher for selection changes and user interactions
     * */
    initialize(queryList: QueryList<SelectableItemToken>): void {
        this._items$ = queryList.changes.pipe(
            startWith(queryList),
            map((items: QueryList<SelectableItemToken>) => items.toArray()),
            shareReplay(1)
        );
        this.listenToItemInteractions();
    }

    /**
     * Sets Value, on which service looks at and updates UI accordingly
     * */
    setValue(v: SelectableListValueType<ValueType>): void {
        this._value$.next(v);
    }

    getValue(): SelectableListValueType<ValueType> {
        return this._getProperValues(this._value as SelectableListValueType<ValueType>);
    }

    /**
     * Start listening for item interactions. Will destroy() first.
     * Will silently continue if service was not initialized first.
     * */
    listenToItemInteractions(): void {
        this.clear();
        const unsubscribe$ = merge(this._destroy$, this._clear$);
        if (this._items$) {
            this._items$
                .pipe(
                    map((items) => items.filter((itm) => itm.fnSelectableItem !== false)),
                    switchMap((items: SelectableItemToken[]) => {
                        const clickedEvents$ = items.map((item) => item.clicked.pipe(map(() => item)));
                        return merge(...clickedEvents$);
                    }),
                    tap((clickedItem) => this._itemClicked(clickedItem)),
                    takeUntil(unsubscribe$)
                )
                .subscribe();
            combineLatest([this._normalizedValue$, this._items$])
                .pipe(
                    tap(([value, items]) => {
                        if (
                            value.length === 0 &&
                            items.some((itm) => itm.getSelected()) &&
                            !this._rootComponent.toggle
                        ) {
                            const selectedValues = this._getSelectedValues(items);
                            this._rootComponent.onChange(selectedValues as SelectableListValueType<ValueType>);
                            return this._value$.next(selectedValues as SelectableListValueType<ValueType>);
                        }
                        items.forEach((item) => {
                            item.setSelected(value.includes(item.value));
                        });
                        this._cd.detectChanges();
                    }),
                    takeUntil(unsubscribe$)
                )
                .subscribe();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroy$.next();
    }

    selectItem(item: SelectableItemToken<ValueType>): void {
        if (item.fnSelectableItem !== false) {
            const val: ValueType[] = [item.value, ...this._value];
            const properValues = this._getProperValues(val as SelectableListValueType<ValueType>);
            this._value$.next(properValues);
            this._rootComponent.onChange(properValues);
        }
    }

    deselectItem(item: SelectableItemToken<ValueType>): void {
        const canBeDeselected = this._rootComponent.toggle || (this._isMultipleMode && this._value.length > 1);
        if (canBeDeselected) {
            const val: SelectableListValueType<ValueType> = this._value.filter(
                (v) => v !== item.value
            ) as SelectableListValueType<ValueType>;
            const properValues = this._getProperValues(val);
            this._value$.next(properValues);
            this._rootComponent.onChange(properValues);
        }
    }

    private get _isMultipleMode(): boolean {
        return this._rootComponent.multiple === true;
    }

    /** @hidden */
    private _itemClicked(item: SelectableItemToken): void {
        const wasSelected = this._value.includes(item.value);
        if (wasSelected) {
            this.deselectItem(item);
        } else {
            this.selectItem(item);
        }
    }

    /** @hidden */
    private _getSelectedValues(items: SelectableItemToken[]): ValueType | ValueType[] {
        const selectedValues = items.filter((itm) => itm.getSelected()).map((itm) => itm.value);
        return this._getProperValues(selectedValues as SelectableListValueType<ValueType>);
    }

    /** @hidden */
    private _getProperValues(values: SelectableListValueType<ValueType>): SelectableListValueType<ValueType> {
        return this._isMultipleMode ? values : values[0];
    }
}
