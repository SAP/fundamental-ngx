import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

import { FdDropEvent, RtlService } from '@fundamental-ngx/cdk/utils';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';

import { ProductSwitchItem } from './product-switch.item';

const containerWidthPxSmallMode = 588;
const containerWidthPx = 776;

@Component({
    selector: 'fd-product-switch-body',
    templateUrl: './product-switch-body.component.html',
    styleUrls: [
        './product-switch-body.component.scss',
        '../../../../../cdk/src/lib/utils/drag-and-drop/drag-and-drop.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSwitchBodyComponent implements OnInit, OnDestroy {
    /** Defines if drag and drop functionality should be included in product switch*/
    @Input()
    dragAndDropEnabled = true;

    /** The product switch's product items. */
    @Input()
    products: ProductSwitchItem[];

    /** Defines if the product switcher should be displayed in list mode, no matter what is the size of window */
    @Input()
    forceListMode = false;

    /** Event thrown on products array change */
    @Output()
    readonly productsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    /** Event emitted on product click */
    @Output()
    readonly itemClicked: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    private _listMode: boolean;

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private _viewportRuler: ViewportRuler,
        @Optional() private readonly _rtlService: RtlService,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._subscriptions.add(this._rtlService?.rtl.subscribe((isRtl) => (this._isRtl = isRtl)));
        this._subscriptions.add(
            this._viewportRuler.change().subscribe((event) => {
                const { innerWidth } = <Window>event.target;
                this._checkSize(innerWidth);
            })
        );

        const { width } = this._viewportRuler.getViewportSize();
        this._checkSize(width);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    _itemClick(item: ProductSwitchItem, event: MouseEvent): void {
        this.products.forEach((product) => (product.selected = product === item));

        this.itemClicked.emit();
        if (item.callback) {
            item.callback(event);
        }
    }

    /** Method called on products change */
    _productSwitchItemsChangeHandle(dropEvent: FdDropEvent<ProductSwitchItem>): void {
        this.productsChange.emit(dropEvent.items);
        this.products = dropEvent.items;
    }

    /** @hidden */
    _keyDownHandle(event: KeyboardEvent): void {
        const target = <HTMLElement>event.target;

        if (!KeyUtil.isKeyCode(event, TAB)) {
            event.preventDefault();
        }

        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            target.click();
        } else if (!this._isListMode()) {
            const i = Array.from(target.parentElement?.children ?? []).indexOf(target);
            this._handleNoListKeydown(event, target, i);
        } else if (this._isListMode() && KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            this._handleListArrowUpDown(event, target);
        }
    }

    /** @hidden */
    _isSmallMode(): boolean {
        return this.products?.length < 7;
    }

    /** @hidden */
    _isListMode(): boolean {
        return this._listMode || this.forceListMode;
    }

    /** @hidden */
    private _checkSize(width: number): void {
        if (this._isSmallMode()) {
            this._listMode = width < containerWidthPxSmallMode;
        } else {
            this._listMode = width < containerWidthPx;
        }

        this._cdr.markForCheck();
    }

    /** @hidden */
    private _handleNoListKeydown(event: KeyboardEvent, target: HTMLElement, i: number): void {
        const previousElementSibling = <HTMLElement>target.previousElementSibling;
        const nextElementSibling = <HTMLElement>target.nextElementSibling;

        if (
            i === this.products.length - 1 &&
            (KeyUtil.isKeyCode(event, RIGHT_ARROW) || (KeyUtil.isKeyCode(event, LEFT_ARROW) && this._isRtl))
        ) {
            while (<HTMLElement>target.previousElementSibling) {
                target = <HTMLElement>target.previousElementSibling;
            }
            target.focus();
        }

        if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            this._isRtl ? nextElementSibling?.focus() : previousElementSibling?.focus();
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            this._isRtl ? previousElementSibling?.focus() : nextElementSibling?.focus();
        } else if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            if (this.products.length >= 7) {
                this._handleNoListMoreThanSeven(event, target, i);
            } else if (this.products.length < 7) {
                this._handleNoListLessThanSeven(event, target, i);
            }
        }
    }

    /** @hidden */
    private _handleNoListMoreThanSeven(event: KeyboardEvent, target: HTMLElement, i: number): void {
        const nextIndexByColumn = 4;
        const children = target.parentElement?.children;

        if (!children) {
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            (<HTMLElement>children[i + nextIndexByColumn])?.focus();
        }

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            (<HTMLElement>children[i - nextIndexByColumn])?.focus();
        }
    }

    /** @hidden */
    private _handleNoListLessThanSeven(event: KeyboardEvent, target: HTMLElement, i: number): void {
        const nextIndexByColumn = 3;
        const children = target.parentElement?.children;

        if (!children) {
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            (<HTMLElement>children[i + nextIndexByColumn])?.focus();
        }

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            (<HTMLElement>children[i - nextIndexByColumn])?.focus();
        }
    }

    /** @hidden */
    private _handleListArrowUpDown(event: KeyboardEvent, target: HTMLElement): void {
        const targetIndex = Array.from(target.parentElement?.children ?? []).indexOf(target);
        const previousElementSibling =
            targetIndex === 0
                ? <HTMLElement>target.parentElement?.children[this.products.length - 1]
                : <HTMLElement>target.previousElementSibling;
        const nextElementSibling =
            targetIndex === this.products.length - 1
                ? <HTMLElement>target.parentElement?.children[0]
                : <HTMLElement>target.nextElementSibling;

        if (this._isListMode() && KeyUtil.isKeyCode(event, DOWN_ARROW) && nextElementSibling) {
            nextElementSibling.focus();
        } else if (this._isListMode() && KeyUtil.isKeyCode(event, UP_ARROW) && previousElementSibling) {
            previousElementSibling.focus();
        }
    }
}
