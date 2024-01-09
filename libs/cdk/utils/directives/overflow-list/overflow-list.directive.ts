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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';
import { resizeObservable } from '../../functions';
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
    constructor(
        private _el: ElementRef,
        private _ngZone: NgZone
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._ngZone.runOutsideAngular(() => {
            resizeObservable(this._el.nativeElement)
                .pipe(debounceTime(10), takeUntilDestroyed(this._destroyRef))
                .subscribe(() => this._ngZone.run(() => this._calculateAmountOfOverflowedItems()));
        });
        this._calculateAmountOfOverflowedItems();
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
