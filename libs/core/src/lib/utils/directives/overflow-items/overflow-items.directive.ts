import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[fdOverflowItems], [fd-overflow-items]'
})
export class OverflowItemsDirective implements AfterViewInit, OnDestroy {

    @Input()
    itemSelector: string;

    @Input()
    offset: number;

    @Output()
    changed: EventEmitter<number> = new EventEmitter<any>();

    private unsubscribe$$ = new Subject();

    constructor(
        private hostEl: ElementRef
    ) {
    }

    ngAfterViewInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(50),
                distinctUntilChanged(),
                takeUntil(this.unsubscribe$$),
            )
            .subscribe((_) => this.calculateAmountOfOverflowedItems());

        this.calculateAmountOfOverflowedItems();
    }

    private calculateAmountOfOverflowedItems(): void {
        const items = this.hostEl.nativeElement.querySelectorAll(this.itemSelector);
        const arrItems = [...items];
        const containerWidth = this.hostEl.nativeElement.offsetWidth;
        const extra = this.checkWidthWithOffset(arrItems, containerWidth);
        this.changed.emit(extra);
    }

    private checkWidthWithOffset(arrItems: HTMLElement[], containerWidth: number, checkWithOffset: boolean = false): number {
        let itemsTotalWidth = 0;
        const parentWidth = checkWithOffset
            ? containerWidth - this.offset
            : containerWidth;
        for (let i = 0; i < arrItems.length; i++) {
            const item = arrItems[i];
            itemsTotalWidth += item.offsetWidth + item.offsetLeft - itemsTotalWidth;
            if (parentWidth < itemsTotalWidth) {
                return checkWithOffset
                    ? arrItems.length - i
                    : this.checkWidthWithOffset(arrItems, containerWidth, true);
            }
        }
        return 0;
    }

    ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }
}
