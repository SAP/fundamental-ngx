import {
    AfterViewInit,
    ContentChildren,
    DestroyRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    Output,
    QueryList,
    inject
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { OverflowListItemDirective } from './overflow-list-item.directive';

@Directive({
    selector: '[fdkOverflowList]',
    standalone: true
})
export class OverflowListDirective implements AfterViewInit {
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
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private observer: ResizeObserver;

    /** @hidden */
    constructor(
        private _el: ElementRef,
        private _ngZone: NgZone
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this.initResizeObserver();
        this.calculateOverflow();
        fromEvent(window, 'resize')
            .pipe(debounceTime(100))
            .subscribe(() => this.calculateOverflow());
    }

    /**
     * @description Get amount of extra items in current list
     * */
    getAmountOfExtraItems(): number {
        const elements = this.overflowItems.toArray().map((item) => item.el.nativeElement);
        const computed = getComputedStyle(this._el.nativeElement);
        const contentWidth = Math.floor(
            this._el.nativeElement.clientWidth -
                parseFloat(computed.paddingLeft || '0') -
                parseFloat(computed.paddingRight || '0')
        );

        if (contentWidth <= 0) {
            return 0;
        }

        return this._checkWidthWithOffset(elements, contentWidth);
    }

    /**
     * @description Ensuring that calculations run in the Angular zone
     */
    public calculateOverflow(): void {
        this._ngZone.run(() => {
            setTimeout(() => {
                const elements = this.overflowItems.map((item) => item.el.nativeElement);
                const contentWidth = this._el.nativeElement.clientWidth;

                let totalWidth = 0;
                let overflowCount = 0;

                elements.forEach((elm) => {
                    const elmWidth = elm.offsetWidth;
                    totalWidth += elmWidth;

                    if (totalWidth > contentWidth) {
                        overflowCount++;
                    }
                });

                this._calculateAmountOfOverflowedItems();
            }, 0);
        });
    }

    private initResizeObserver(): void {
        this.observer = new ResizeObserver(() => {
            this._ngZone.run(() => this.calculateOverflow());
        });
        this.observer.observe(this._el.nativeElement);
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
    private _checkWidthWithOffset(
        arrItems: HTMLElement[],
        containerWidth: number,
        checkWithOffset: boolean = false
    ): number {
        let itemsTotalWidth = 0;
        const parentWidth = checkWithOffset ? containerWidth - this.overflowOffset : containerWidth;

        arrItems.forEach((item) => {
            item.hidden = true;
            item.style.display = this.itemCssBlockValue;
        });

        for (let i = 0; i < arrItems.length; i++) {
            const item = arrItems[i];

            itemsTotalWidth += this.isRtl
                ? containerWidth - item.offsetLeft - itemsTotalWidth
                : Math.ceil(item.offsetWidth + item.offsetLeft - itemsTotalWidth);

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
        arrItems.forEach((item) => {
            item.hidden = false;
            item.style.removeProperty('display');
        });
    }
}
