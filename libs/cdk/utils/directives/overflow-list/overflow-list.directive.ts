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
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { OverflowListItemDirective } from './overflow-list-item.directive';

@Directive({
    selector: '[fdkOverflowList]',
    standalone: true,
    host: {
        style: 'overflow: hidden;'
    }
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
    private _resizeObserver: ResizeObserver;

    /** @hidden */
    private _mutationObserver: MutationObserver;

    /** @hidden Track whether a recalculation microtask is already scheduled. */
    private _recalcScheduled = false;

    /** @hidden */
    constructor(
        private _el: ElementRef,
        private _ngZone: NgZone
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._initResizeObserver();
        this._initMutationObserver();
        this.calculateOverflow();

        // React to content children changes (items added/removed)
        this.overflowItems.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this.calculateOverflow());

        fromEvent(window, 'resize')
            .pipe(debounceTime(100), takeUntilDestroyed(this._destroyRef))
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
     * @description Schedule overflow recalculation via microtask.
     * Microtasks execute after DOM mutations but before the browser paints,
     * so items are measured and hidden before the user ever sees them overflow.
     * Multiple calls within the same task are coalesced by the _recalcScheduled flag.
     */
    public calculateOverflow(): void {
        if (this._recalcScheduled) {
            return;
        }
        this._recalcScheduled = true;
        Promise.resolve().then(() => {
            this._recalcScheduled = false;
            this._ngZone.run(() => this._calculateAmountOfOverflowedItems());
        });
    }

    /** @hidden */
    private _initResizeObserver(): void {
        this._resizeObserver = new ResizeObserver(() => {
            this._ngZone.run(() => this.calculateOverflow());
        });
        this._resizeObserver.observe(this._el.nativeElement);
        this._destroyRef.onDestroy(() => this._resizeObserver.disconnect());
    }

    /**
     * @hidden
     * @description Watch for DOM content changes within items.
     * - childList: detects items added/removed (e.g. new tabs rendered by @for)
     * - characterData: detects text content changes (e.g. label updates, i18n)
     * Does NOT watch attributes, so our own measurement (hidden/display toggles)
     * and the consumer's CSS class changes won't cause infinite loops.
     */
    private _initMutationObserver(): void {
        this._mutationObserver = new MutationObserver(() => this.calculateOverflow());
        this._mutationObserver.observe(this._el.nativeElement, {
            childList: true,
            characterData: true,
            subtree: true
        });
        this._destroyRef.onDestroy(() => this._mutationObserver.disconnect());
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
