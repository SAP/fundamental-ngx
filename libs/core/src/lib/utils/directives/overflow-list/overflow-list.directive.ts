import { AfterViewInit, ContentChildren, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { OverflowListItemDirective } from './overflow-list-item.directive';


@Directive({
    selector: '[fdOverflowList]'
})
export class OverflowListDirective implements AfterViewInit, OnDestroy {

    /**
     * @description Offset to calculate correct position
     */
    @Input()
    overflowOffset = 0;

    /**
     * @description Flag representing rtl mode
     */
    @Input()
    isRtl: boolean;

    /**
     * @description value of display property of existed list items
     */
    @Input()
    itemCssBlockValue = 'flex';

    /**
     * @description Emits when changed amount of extra items
     */
    @Output()
    overflowChanged: EventEmitter<number> = new EventEmitter<number>();

    /**
     * @description References to QueryList of OverflowListItemDirective
     */
    @ContentChildren(OverflowListItemDirective)
    overflowItems: QueryList<OverflowListItemDirective>;

    /** @hidden */
    private _onDestroy$ = new Subject();

    /** @hidden */
    constructor(
        private _el: ElementRef
    ) {
    }

    /** @hidden */
    ngAfterViewInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(50),
                distinctUntilChanged(),
                takeUntil(this._onDestroy$)
            )
            .subscribe((_) => this._calculateAmountOfOverflowedItems());

        this._calculateAmountOfOverflowedItems();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @description Get amount of extra items in current list
     * */
    getAmountOfExtraItems(): number {
        const elements = this.overflowItems.toArray().map(item => item.el.nativeElement);
        const computed = getComputedStyle(this._el.nativeElement);
        const contentWidth = this._el.nativeElement.clientWidth
            - parseFloat(computed.paddingLeft)
            - parseFloat(computed.paddingRight);
        return this._checkWidthWithOffset(elements, contentWidth);
    }

    /** @hidden */
    private _calculateAmountOfOverflowedItems(): void {
        const extra = this.getAmountOfExtraItems();
        this.overflowChanged.emit(extra);
    }

    /**
     * @hidden
     * @param arrItems
     * @param containerWidth
     * @param checkWithOffset
     * */
    private _checkWidthWithOffset(arrItems: HTMLElement[], containerWidth: number, checkWithOffset: boolean = false): number {
        let itemsTotalWidth = 0;
        const parentWidth = checkWithOffset
            ? containerWidth - this.overflowOffset
            : containerWidth;

        arrItems.forEach(item => {
            item.hidden = true;
            item.style.display = this.itemCssBlockValue;
        });

        for (let i = 0; i < arrItems.length; i++) {
            const item = arrItems[i];

            itemsTotalWidth += this.isRtl
                ? containerWidth - item.offsetLeft - itemsTotalWidth
                : item.offsetWidth + item.offsetLeft - itemsTotalWidth;


            if (parentWidth < itemsTotalWidth) {
                this._clearTempStyles(arrItems);
                return checkWithOffset
                    ? arrItems.length - i
                    : this._checkWidthWithOffset(arrItems, containerWidth, true);
            }
        }

        this._clearTempStyles(arrItems);
        return 0;
    }

    /**
     * @param arrItems
     * @hidden
     * */
    private _clearTempStyles(arrItems: HTMLElement[]): void {
        arrItems.forEach(item => {
            item.hidden = false;
            item.style.removeProperty('display');
        });
    }
}
