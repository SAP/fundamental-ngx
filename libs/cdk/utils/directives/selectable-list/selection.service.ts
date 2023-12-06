import { coerceArray } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Injectable, OnDestroy, QueryList } from '@angular/core';
import equal from 'fast-deep-equal';
import { Observable, ReplaySubject, Subject, combineLatest, isObservable, merge, of, switchMap } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, takeUntil, tap } from 'rxjs/operators';
import { SelectComponentRootToken, SelectableListValueType } from './select-component-root.token';
import { SelectableItemToken } from './selectable-item.token';

export type SelectionItemsList<ElementType extends Element, ValueType = ElementType> =
    | QueryList<SelectableItemToken<ElementType, ValueType>>
    | Observable<SelectableItemToken<ElementType, ValueType>[]>
    | SelectableItemToken<ElementType, ValueType>[];

@Injectable()
export class SelectionService<ElementType extends Element, ValueType = ElementType> implements OnDestroy {
    /** @hidden */
    value$: Observable<SelectableListValueType<ValueType>>;

    /** @hidden */
    private _items$!: Observable<SelectableItemToken<ElementType, ValueType>[]>;
    /** @hidden */
    private _value$ = new ReplaySubject<SelectableListValueType<ValueType>>(1);
    /** @hidden */
    private _normalizedValue$: Observable<ValueType[]>;
    /** @hidden */
    private _rootComponent!: SelectComponentRootToken<ElementType>;
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
            map((v) => this._getProperValues(v as SelectableListValueType<ElementType>)),
            shareReplay(1)
        );
    }

    /**
     * Register main select component, which holds config
     * */
    registerRootComponent(rootComponent: SelectComponentRootToken<ElementType>): void {
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
    initialize(list: SelectionItemsList<ElementType, ValueType>): void {
        if (list instanceof QueryList) {
            this._items$ = list.changes.pipe(
                startWith(list),
                map((items: QueryList<SelectableItemToken<ElementType, ValueType>>) => items.toArray()),
                shareReplay(1)
            );
        } else {
            this._items$ = isObservable(list) ? list : of(list);
        }
        this.listenToItemInteractions();
    }

    /**
     * Sets Value, on which service looks at and updates UI accordingly
     * */
    setValue(v: SelectableListValueType<ElementType>): void {
        this._value$.next(v);
    }

    /** @hidden */
    getValue(): SelectableListValueType<ElementType> {
        return this._getProperValues(this._value as SelectableListValueType<ElementType>);
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
                    map((items) => items.filter((itm) => itm.fdkSelectableItem !== false)),
                    switchMap((items: SelectableItemToken<ElementType, ValueType>[]) => {
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
                            this._rootComponent.onChange(selectedValues as SelectableListValueType<ElementType>);
                            return this._value$.next(selectedValues as SelectableListValueType<ElementType>);
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

    /** @hidden */
    selectItem(item: SelectableItemToken<ElementType, ValueType>): void {
        if (item.fdkSelectableItem !== false) {
            const val: ValueType[] = [item.value, ...this._value];
            const properValues = this._getProperValues(val as SelectableListValueType<ElementType>);
            this._value$.next(properValues);
            this._rootComponent.onChange(properValues);
        }
    }

    /** @hidden */
    deselectItem(item: SelectableItemToken<ElementType, ValueType>): void {
        const canBeDeselected = this._rootComponent.toggle || (this._isMultipleMode && this._value.length > 1);
        if (canBeDeselected) {
            const val: SelectableListValueType<ElementType> = this._value.filter(
                (v) => v !== item.value
            ) as SelectableListValueType<ElementType>;
            const properValues = this._getProperValues(val);
            this._value$.next(properValues);
            this._rootComponent.onChange(properValues);
        }
    }

    /** @hidden */
    private get _isMultipleMode(): boolean {
        return this._rootComponent.multiple === true;
    }

    /** @hidden */
    private _itemClicked(item: SelectableItemToken<ElementType, ValueType>): void {
        const wasSelected = this._value.includes(item.value);
        if (wasSelected) {
            this.deselectItem(item);
        } else {
            this.selectItem(item);
        }
    }

    /** @hidden */
    private _getSelectedValues(items: SelectableItemToken<ElementType, ValueType>[]): ElementType | ElementType[] {
        const selectedValues = items.filter((itm) => itm.getSelected()).map((itm) => itm.value);
        return this._getProperValues(selectedValues as SelectableListValueType<ElementType>);
    }

    /** @hidden */
    private _getProperValues(values: SelectableListValueType<ElementType>): SelectableListValueType<ElementType> {
        return this._isMultipleMode ? values : values[0];
    }
}
