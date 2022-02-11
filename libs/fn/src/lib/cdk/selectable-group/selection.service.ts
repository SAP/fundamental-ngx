import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { coerceArray } from '@angular/cdk/coercion';
import { combineLatest, fromEvent, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, startWith, takeUntil, tap } from 'rxjs/operators';
import equal from 'fast-deep-equal';
import { SelectableItemToken } from './SelectableItemToken';
import { SelectComponentRootToken } from './SelectComponentRootToken';

@Injectable()
export class SelectionService<ValueType = any> implements OnDestroy {
    /** @hidden */
    private _refresh$ = new Subject();
    /** @hidden */
    private _value$ = new ReplaySubject<ValueType | ValueType[]>(1);
    /** @hidden */
    private _normalizedValue$: Observable<ValueType[]>;
    /** @hidden */
    private _rootComponent!: SelectComponentRootToken;
    /** @hidden */
    private _destroy$ = new Subject();

    /** @hidden */
    constructor() {
        this._normalizedValue$ = this._value$.pipe(
            distinctUntilChanged(equal),
            map((v) => coerceArray<ValueType>(v)),
            map((value) => (this._rootComponent.multiple ? value : [value[0]])),
            map((coerced: ValueType[]) => coerced.filter(Boolean))
        );
    }

    /**
     * Register main select component, which holds config
     * */
    registerRootComponent(rootComponent: SelectComponentRootToken<ValueType | Array<ValueType>>): void {
        this._rootComponent = rootComponent;
    }

    /**
     * Initialize watcher for selection changes and user interactions
     * */
    initialize(queryList: QueryList<SelectableItemToken>): void {
        const items$ = queryList.changes.pipe(
            startWith(queryList),
            map((items: QueryList<SelectableItemToken>) => items.toArray())
        );
        items$
            .pipe(
                tap(() => this._refresh$.next()),
                tap((items) => this._listenToItemsInteractions(items)),
                takeUntil(this._destroy$)
            )
            .subscribe();
        combineLatest([this._normalizedValue$, items$])
            .pipe(
                tap(([value, items]) => {
                    if (value.length === 0 && items.some((itm) => itm.getSelected()) && !this._rootComponent.toggle) {
                        const selectedValues = this._getSelectedValues(items);
                        this._rootComponent.onChange(selectedValues);
                        return this._value$.next(selectedValues);
                    }
                    items.forEach((button) => {
                        button.setSelected(value.includes(button.value));
                    });
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    /**
     * Sets Value, on which service looks at and updates UI accordingly
     * */
    setValue(v: ValueType | ValueType[]): void {
        this._value$.next(v);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroy$.next();
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
        this._value$
            .pipe(
                first(),
                map((val) => coerceArray(val).filter(Boolean)),
                tap((currentValue) => {
                    const wasSelected = currentValue.includes(item.value);
                    let val: ValueType[];
                    if (wasSelected) {
                        val = currentValue.filter((v) => v !== item.value);
                    } else {
                        val = [item.value, ...currentValue];
                    }
                    const properValues = this._getProperValues(val);
                    this._value$.next(properValues);
                    this._rootComponent.onChange(properValues);
                })
            )
            .subscribe();
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
