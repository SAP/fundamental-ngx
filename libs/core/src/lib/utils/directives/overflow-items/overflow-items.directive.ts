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
import { debounceTime, distinctUntilChanged, filter, skip, takeUntil } from 'rxjs/operators';

export type ChangedOverflowItemsEvent = 'resize'|'treeChanging'|'init'|'rtlMode'

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
    changed: EventEmitter<{amount: number, event: ChangedOverflowItemsEvent}> = new EventEmitter<any>();

    private _onDestroy$ = new Subject();
    private mutationsObserver: MutationObserver;
    private containerSubTreeChanged$$: Subject<void> = new Subject<void>();
    itemsLength = 0;

    constructor(
        private _el: ElementRef,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.rtl && !changes.rtl.firstChange) {
            this.calculateAmountOfOverflowedItems('rtlMode');
        }
    }

    ngAfterViewInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(50),
                distinctUntilChanged(),
                takeUntil(this._onDestroy$),
            )
            .subscribe((_) => this.calculateAmountOfOverflowedItems('resize'));

        this.calculateAmountOfOverflowedItems('init');

        // this.mutationsObserver = new MutationObserver(() => this.containerSubTreeChanged$$.next());
        // this.mutationsObserver.observe(this._el.nativeElement, {childList: true});
        //
        // this.containerSubTreeChanged$$
        //     .pipe(
        //         skip(1),
        //         debounceTime(100),
        //         filter(_ => {
        //             const items = this._el.nativeElement.querySelectorAll(this.itemSelector);
        //             return this._el.nativeElement.children.length !== this.itemsLength;
        //         }),
        //         takeUntil(this._onDestroy$),
        //     )
        //     .subscribe(() => {
        //         console.log('containerSubTreeChanged$$');
        //         this.itemsLength = this._el.nativeElement.children.length;
        //         this.calculateAmountOfOverflowedItems('treeChanging');
        //     });

    }

    getAmountOfExtraItems(): number {
        const items = this._el.nativeElement.querySelectorAll(this.itemSelector);
        const arrItems = [...items];
        const computed = getComputedStyle(this._el.nativeElement);
        const contentWidth = this._el.nativeElement.clientWidth
            - parseFloat(computed.paddingLeft)
            - parseFloat(computed.paddingRight);
        return this.checkWidthWithOffset(arrItems, contentWidth);
    }

    private calculateAmountOfOverflowedItems(event: ChangedOverflowItemsEvent): void {
        const extra = this.getAmountOfExtraItems()
        this.changed.emit({amount: extra, event: event});
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
        this.mutationsObserver.disconnect();
    }
}
