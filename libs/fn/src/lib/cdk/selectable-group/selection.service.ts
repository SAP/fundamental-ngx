import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { SelectableItemToken } from './SelectableItemToken';
import { combineLatest, fromEvent, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { SelectComponentRootToken } from './SelectComponentRootToken';
import { coerceArray } from '@angular/cdk/coercion';

@Injectable()
export class SelectionService<ValueType = any> implements OnDestroy {
    items!: QueryList<SelectableItemToken>;
    destroy$ = new Subject();

    private refresh$ = new Subject();
    private value$ = new ReplaySubject<ValueType | ValueType[]>(1);
    private normalizedValue$: Observable<ValueType[]>;
    private rootComponent!: SelectComponentRootToken;

    constructor() {
        this.normalizedValue$ = this.value$.pipe(
            distinctUntilChanged(),
            map((value) => {
                const coerced = coerceArray(value);
                return coerced.filter(Boolean);
            })
        );
    }

    registerRootComponent(rootComponent: SelectComponentRootToken<ValueType | Array<ValueType>>): void {
        this.rootComponent = rootComponent;
    }

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
                    if (value.length === 0 && items.some((itm) => itm.getSelected())) {
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

    setValue(v: ValueType | ValueType[]): void {
        this.value$.next(v);
    }

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
                    filter((event) => KeyUtil.isKeyCode(event, [ENTER, SPACE])),
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
        console.log({ item });
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
