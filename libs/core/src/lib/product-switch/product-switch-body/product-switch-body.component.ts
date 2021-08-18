import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';

import { FdDropEvent, RtlService } from '@fundamental-ngx/core/utils';
import { KeyUtil } from '@fundamental-ngx/core/utils';

import { ProductSwitchItem } from './product-switch.item';

@Component({
    selector: 'fd-product-switch-body',
    templateUrl: './product-switch-body.component.html',
    styleUrls: ['./product-switch-body.component.scss', '../../utils/drag-and-drop/drag-and-drop.scss'],
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
    private _istMode: boolean;

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(@Optional() private readonly _rtlService: RtlService) {}

    /** @hidden */
    ngOnInit(): void {
        this._subscriptions.add(this._rtlService?.rtl.subscribe((isRtl) => (this._isRtl = isRtl)));

        this._checkSize();
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        this._checkSize();
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
            const i = Array.from(target.parentElement.children).indexOf(target);
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
        return this._istMode || this.forceListMode;
    }

    /** @hidden */
    private _checkSize(): void {
        if (this._isSmallMode()) {
            this._istMode = window.innerWidth < 588;
        } else {
            this._istMode = window.innerWidth < 776;
        }
    }

    /** @hidden */
    private _handleNoListKeydown(event: KeyboardEvent, target: HTMLElement, i: number): void {
        const previousElementSibling = <HTMLElement>target.previousElementSibling;
        const nextElementSibling = <HTMLElement>target.nextElementSibling;

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
        const { children } = target.parentElement;
        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            (<HTMLElement>children[i + 4])?.focus();
        }

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            (<HTMLElement>children[i - 4])?.focus();
        }
    }

    /** @hidden */
    private _handleNoListLessThanSeven(event: KeyboardEvent, target: HTMLElement, i: number): void {
        const { children } = target.parentElement;

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            (<HTMLElement>children[i + 3])?.focus();
        }

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            (<HTMLElement>children[i - 3])?.focus();
        }
    }

    /** @hidden */
    private _handleListArrowUpDown(event: KeyboardEvent, target: HTMLElement): void {
        const previousElementSibling = <HTMLElement>target.previousElementSibling;
        const nextElementSibling = <HTMLElement>target.nextElementSibling;

        if (this._isListMode() && KeyUtil.isKeyCode(event, DOWN_ARROW) && nextElementSibling) {
            nextElementSibling.focus();
        } else if (this._isListMode() && KeyUtil.isKeyCode(event, UP_ARROW) && previousElementSibling) {
            previousElementSibling.focus();
        }
    }
}
