import {
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    Output,
    QueryList
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverflowListItemDirective } from './overflow-list-item.directive';
import { ViewportRuler } from '@angular/cdk/overlay';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdOverflowList], [fd-overflow-list]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkOverflowList]', '[fdOverflowList], [fd-overflow-list]')
        }
    ]
})
export class DeprecatedOverflowListDirective extends DeprecatedSelector {}

@Directive({
    selector: '[fdkOverflowList], [fdOverflowList], [fd-overflow-list]',
    standalone: true
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
    private _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(private _el: ElementRef, private _viewportRuler: ViewportRuler, private _ngZone: NgZone) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._viewportRuler
            .change(50)
            .pipe(takeUntil(this._onDestroy$))
            // ViewportRuler invoked out of zone, that is why I need to invoke function in zone
            .subscribe(() => this._ngZone.run(() => this._calculateAmountOfOverflowedItems()));

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
        const elements = this.overflowItems.toArray().map((item) => item.el.nativeElement);
        const computed = getComputedStyle(this._el.nativeElement);
        const contentWidth =
            this._el.nativeElement.clientWidth - parseFloat(computed.paddingLeft) - parseFloat(computed.paddingRight);
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
        arrItems.forEach((item) => {
            item.hidden = false;
            item.style.removeProperty('display');
        });
    }
}
