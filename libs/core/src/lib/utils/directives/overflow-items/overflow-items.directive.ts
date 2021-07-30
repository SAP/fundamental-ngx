import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';


@Directive({
    selector: '[fdOverflowItems]'
})
export class OverflowItemsDirective implements AfterViewInit, OnDestroy {

    @Input()
    itemSelector: string;

    @Input()
    overflowOffset = 0;

    @Input()
    isRtl: boolean;

    @Input()
    itemCssBlockValue = 'flex';

    @Output()
    overflowChanged: EventEmitter<number> = new EventEmitter<number>();

    private _onDestroy$ = new Subject();

    constructor(
        private _el: ElementRef
    ) {
    }

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

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    getAmountOfExtraItems(): number {
        const items = this._el.nativeElement.querySelectorAll(this.itemSelector);
        const arrItems = [...items];
        const computed = getComputedStyle(this._el.nativeElement);
        const contentWidth = this._el.nativeElement.clientWidth
            - parseFloat(computed.paddingLeft)
            - parseFloat(computed.paddingRight);
        return this._checkWidthWithOffset(arrItems, contentWidth);
    }

    private _calculateAmountOfOverflowedItems(): void {
        const extra = this.getAmountOfExtraItems();
        this.overflowChanged.emit(extra);
    }

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

    private _clearTempStyles(arrItems: HTMLElement[]): void {
        arrItems.forEach(item => {
            item.hidden = false;
            item.style.removeProperty('display');
        });
    }
}
