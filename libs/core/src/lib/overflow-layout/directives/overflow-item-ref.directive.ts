import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverflowItemDirectiveContext, OverflowItemRef } from '../interfaces/overflow-item-ref.interface';
import { OverflowItem } from '../interfaces/overflow-item.interface';
import { FD_OVERFLOW_ITEM_REF } from '../tokens/overflow-item-ref.token';

/**
 * Structural directive which is used to pass the context of the item to the template engine.
 */
@Directive({
    selector: '[fdOverflowItemRef]',
    providers: [
        {
            provide: FD_OVERFLOW_ITEM_REF,
            useExisting: OverflowItemRefDirective
        }
    ]
})
export class OverflowItemRefDirective<T = any> implements OverflowItemRef<T> {
    /**
     * Element ref of the `fdOverflowLayoutItem` directive.
     */
    elementRef: ElementRef<HTMLElement>;
    /**
     * `fdOverflowLayoutItem` directive.
     */
    overflowItem: OverflowItem;
    /**
     * Whether the item is hidden.
     */
    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(value: boolean) {
        this._hidden = value;
        this.overflowItem.hiddenChange.emit(value);
    }
    _hidden = false;
    /**
     * Index of the item in the array of Overflow Layout Component's items.
     */
    index: number;

    get first$(): Observable<boolean> {
        return this._first.asObservable();
    }

    get last$(): Observable<boolean> {
        return this._last.asObservable();
    }

    first: boolean;
    last: boolean;

    @Input('fdOverflowItemRef')
    item: T;

    private _first = new BehaviorSubject<boolean>(false);
    private _last = new BehaviorSubject<boolean>(false);

    /** @hidden */
    static ngTemplateContextGuard(
        dir: OverflowItemRefDirective,
        ctx: OverflowItemDirectiveContext
    ): ctx is OverflowItemDirectiveContext {
        return true;
    }

    /** @hidden */
    constructor(public templateRef: TemplateRef<OverflowItemDirectiveContext<T>>) {}

    /**
     * Sets the element reference of the `fdOverflowLayoutItem` directive.`
     * @param elmRef
     */
    setElementRef(elmRef: ElementRef): void {
        if (this.elementRef) {
            return;
        }
        this.elementRef = elmRef;
    }

    /**
     * Sets the `fdOverflowLayoutItem` directive.
     * @param item
     */
    setOverflowItem(item: OverflowItem): void {
        this.overflowItem = item;
    }

    setFirst(value: boolean): void {
        this.first = value;
        this._first.next(value);
    }

    setLast(value: boolean): void {
        this.last = value;
        this._last.next(value);
    }
}
