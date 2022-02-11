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
    items!: QueryList<SelectableItemToken>;
    /** @hidden */
    destroy$ = new Subject();

    private refresh$ = new Subject();
    private value$ = new ReplaySubject<ValueType | ValueType[]>(1);
    private normalizedValue$: Observable<ValueType[]>;
    private rootComponent!: SelectComponentRootToken;

    /** @hidden */
    constructor() {
        this.normalizedValue$ = this.value$.pipe(
            distinctUntilChanged(equal),
            map((v) => coerceArray<ValueType>(v)),
            map((value) => (this.rootComponent.multiple ? value : [value[0]])),
            map((coerced: ValueType[]) => coerced.filter(Boolean))
        );
    }

    /**
     * Register main select component, which holds config
     * */
    registerRootComponent(rootComponent: SelectComponentRootToken<ValueType | Array<ValueType>>): void {
        this.rootComponent = rootComponent;
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
                tap(() => this.refresh$.next()),
                tap((items) => this.listenToItemsInteractions(items)),
                takeUntil(this.destroy$)
            )
            .subscribe();
        combineLatest([this.normalizedValue$, items$])
            .pipe(
                tap(([value, items]) => {
                    if (value.length === 0 && items.some((itm) => itm.getSelected()) && !this.rootComponent.toggle) {
                        const selectedValues = this.getSelectedValues(items);
                        this.rootComponent.onChange(selectedValues);
                        return this.value$.next(selectedValues);
                    }
                    items.forEach((button) => {
                        button.setSelected(value.includes(button.value));
                    });
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    /**
     * Sets Value, on which service looks at and updates UI accordingly
     * */
    setValue(v: ValueType | ValueType[]): void {
        this.value$.next(v);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.destroy$.next();
    }

    private listenToItemsInteractions(items: SelectableItemToken[]): void {
        const unsubscribe$ = merge(this.refresh$, this.destroy$);
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
                    tap(() => this.itemClicked(item)),
                    takeUntil(unsubscribe$)
                )
                .subscribe();
        }
    }

    private itemClicked(item: SelectableItemToken): void {
        this.value$
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
                    const properValues = this.getProperValues(val);
                    this.value$.next(properValues);
                    this.rootComponent.onChange(properValues);
                })
            )
            .subscribe();
    }

    private getSelectedValues(items: SelectableItemToken[]): ValueType | ValueType[] {
        const selectedValues = items.filter((itm) => itm.getSelected()).map((itm) => itm.value);
        return this.getProperValues(selectedValues);
    }

    private getProperValues(values: ValueType[]): ValueType | ValueType[] {
        if (this.rootComponent.multiple) {
            return values;
        }
        return values[0];
    }
}
