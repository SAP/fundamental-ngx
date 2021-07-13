import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[fdOverflowItems], [fd-overflow-items]'
})
export class OverflowItemsDirective implements OnChanges, AfterViewInit, OnDestroy {

    @Input()
    itemSelector: string;

    @Input()
    offset: number;

    @Input()
    isRtl: boolean;

    @Output()
    changed: EventEmitter<number> = new EventEmitter<any>();

    private _onDestroy$ = new Subject();

    constructor(
        private _el: ElementRef,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.rtl && !changes.rtl.firstChange) {
            this.calculateAmountOfOverflowedItems();
        }
    }

    ngAfterViewInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(50),
                distinctUntilChanged(),
                takeUntil(this._onDestroy$),
            )
            .subscribe((_) => this.calculateAmountOfOverflowedItems());

        this.calculateAmountOfOverflowedItems();
    }

    private calculateAmountOfOverflowedItems(): void {
        const items = this._el.nativeElement.querySelectorAll(this.itemSelector);
        const arrItems = [...items];
        const computed = getComputedStyle(this._el.nativeElement);
        const contentWidth = this._el.nativeElement.clientWidth
            - parseFloat(computed.paddingLeft)
            - parseFloat(computed.paddingRight);
        const extra = this.checkWidthWithOffset(arrItems, contentWidth);
        this.changed.emit(extra);
    }

    private checkWidthWithOffset(arrItems: HTMLElement[], containerWidth: number, checkWithOffset: boolean = false): number {
        let itemsTotalWidth = 0;
        const parentWidth = checkWithOffset
            ? containerWidth - this.offset
            : containerWidth;

        arrItems.forEach(item => {
            item.hidden = true;
            item.style.display = 'flex';
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
                    : this.checkWidthWithOffset(arrItems, containerWidth, true);
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

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}
