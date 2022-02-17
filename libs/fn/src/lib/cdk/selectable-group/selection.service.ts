import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { coerceArray } from '@angular/cdk/coercion';
import { combineLatest, fromEvent, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, startWith, takeUntil, tap } from 'rxjs/operators';
import equal from 'fast-deep-equal';
import { SelectableItemToken } from './SelectableItemToken';
import { SelectComponentRootToken } from './SelectComponentRootToken';

@Injectable()
export class SelectionService<ValueType = any> implements OnDestroy {
    /** @hidden */
    private _refresh$ = new Subject<void>();
    /** @hidden */
    private _items$!: Observable<SelectableItemToken[]>;
    /** @hidden */
    private _value$ = new ReplaySubject<ValueType | ValueType[]>(1);
    /** @hidden */
    private _normalizedValue$: Observable<ValueType[]>;
    /** @hidden */
    private _rootComponent!: SelectComponentRootToken;
    /** @hidden */
    private _destroy$ = new Subject<void>();
    /** @hidden */
    private _clear$ = new Subject<void>();
    /** @hidden */
    private _value: ValueType[] = [];

    /** @hidden */
    constructor() {
        this._normalizedValue$ = this._value$.pipe(
            distinctUntilChanged(equal),
            map((v) => coerceArray<ValueType>(v)),
            map((value) => (this._rootComponent.multiple ? value : [value[0]])),
            map((coerced: ValueType[]) => coerced.filter(Boolean))
        );
        this._normalizedValue$.pipe(takeUntil(this._destroy$)).subscribe((val) => (this._value = val));
    }

    /**
     * Register main select component, which holds config
     * */
    registerRootComponent(rootComponent: SelectComponentRootToken<ValueType | Array<ValueType>>): void {
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
    setValue(v: ValueType | ValueType[]): void {
        this._value$.next(v);
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
                    map((items) => items.filter((itm) => itm.selectable !== false)),
                    tap(() => this._refresh$.next()),
                    tap((items) => this._listenToItemsInteractions(items)),
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
                            this._rootComponent.onChange(selectedValues);
                            return this._value$.next(selectedValues);
                        }
                        items.forEach((item) => {
                            item.setSelected(value.includes(item.value));
                        });
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
        if (item.selectable) {
            const val: ValueType[] = [item.value, ...this._value];
            const properValues = this._getProperValues(val);
            this._value$.next(properValues);
            this._rootComponent.onChange(properValues);
        }
    }

    deselectItem(item: SelectableItemToken<ValueType>): void {
        const val: ValueType[] = this._value.filter((v) => v !== item.value);
        const properValues = this._getProperValues(val);
        this._value$.next(properValues);
        this._rootComponent.onChange(properValues);
    }

    /** @hidden */
    private _listenToItemsInteractions(items: SelectableItemToken[]): void {
        const unsubscribe$ = merge(this._refresh$, this._destroy$);
        for (const item of items) {
            const htmlElement = item.elementRef().nativeElement;
            const events = merge(
                fromEvent(htmlElement, 'click'),
                fromEvent<KeyboardEvent>(htmlElement, 'keydown').pipe(
                    filter((event) => [ENTER, SPACE].includes(event.keyCode)),
                    tap((event) => event.preventDefault())
                )
            );
            events
                .pipe(
                    tap(() => this._itemClicked(item)),
                    takeUntil(unsubscribe$)
                )
                .subscribe();
        }
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
        return this._getProperValues(selectedValues);
    }

    /** @hidden */
    private _getProperValues(values: ValueType[]): ValueType | ValueType[] {
        if (this._rootComponent.multiple) {
            return values;
        }
        return values[0];
    }
}
