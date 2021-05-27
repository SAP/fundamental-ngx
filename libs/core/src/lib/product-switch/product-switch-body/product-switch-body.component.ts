import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ProductSwitchItem } from './product-switch.item';
import { FdDropEvent } from '@fundamental-ngx/core/utils';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';

@Component({
    selector: 'fd-product-switch-body',
    templateUrl: './product-switch-body.component.html',
    styleUrls: [
        './product-switch-body.component.scss',
        '../../utils/drag-and-drop/drag-and-drop.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSwitchBodyComponent implements OnInit {
    /** Defines if drag and drop functionality should be included in product switch*/
    @Input()
    dragAndDropEnabled = true;

    /** The product switch's product items. */
    @Input()
    products: ProductSwitchItem[];

    /** Event thrown on products array change */
    @Output()
    readonly productsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    /** Event emitted on product click */
    @Output()
    readonly itemClicked: EventEmitter<void> = new EventEmitter<void>();

    /** Defines if the product switcher should be displayed in list mode, no matter what is the size of window */
    @Input()
    forceListMode = false;

    /**
     * @hidden
     */
    listMode: boolean;

    /** @hidden */
    ngOnInit(): void {
        this._checkSize();
    }

    /**
     * @hidden
     */
    itemClick(item: ProductSwitchItem, event: any): void {
        this.itemClicked.emit();
        if (item.callback) {
            item.callback(event);
        }
    }

    /** Method called on products change */
    productSwitchItemsChangeHandle(dropEvent: FdDropEvent<ProductSwitchItem>): void {
        this.productsChange.emit(dropEvent.items);
        this.products = dropEvent.items;
    }

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        this._checkSize();
    }

    /** @hidden */
    keyDownHandle(event: KeyboardEvent): void {
        const target = <HTMLElement>event.target;
        const i = Array.from(target.parentElement.children).indexOf(target);
        if (!KeyUtil.isKeyCode(event, TAB)) {
            event.preventDefault();
        }
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            target.click();
        } else if (!this.isListMode()) {
            this._handleNoListKeydown(event, target, i);
        } else if (this.isListMode() && KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            this._handleListArrowUpDown(event, target);
        }
    }

    /** @hidden */
    public isSmallMode(): boolean {
        return this.products && this.products.length < 7;
    }

    /** @hidden */
    public isListMode(): boolean {
        return this.listMode || this.forceListMode;
    }

    /** @hidden */
    private _checkSize(): void {
        if (this.isSmallMode()) {
            this.listMode = window.innerWidth < 588;
        } else {
            this.listMode = window.innerWidth < 776;
        }
    }

    /** @hidden */
    private _handleNoListKeydown(event: KeyboardEvent, target: HTMLElement, i: number): void {
        if (KeyUtil.isKeyCode(event, LEFT_ARROW) && target.previousElementSibling) {
            (<HTMLElement>target.previousElementSibling).focus();
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW) && target.nextElementSibling) {
            (<HTMLElement>target.nextElementSibling).focus();
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
        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            if (target.parentElement.children[i + 4]) {
                (<HTMLElement>target.parentElement.children[i + 4]).focus();
            }
        }
        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            if (target.parentElement.children[i - 4]) {
                (<HTMLElement>target.parentElement.children[i - 4]).focus();
            }
        }
    }

    /** @hidden */
    private _handleNoListLessThanSeven(event: KeyboardEvent, target: HTMLElement, i: number): void {
        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            if (target.parentElement.children[i + 3]) {
                (<HTMLElement>target.parentElement.children[i + 3]).focus();
            }
        }
        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            if (target.parentElement.children[i - 3]) {
                (<HTMLElement>target.parentElement.children[i - 3]).focus();
            }
        }
    }

    /** @hidden */
    private _handleListArrowUpDown(event: KeyboardEvent, target: HTMLElement): void {
        if (this.isListMode() && KeyUtil.isKeyCode(event, DOWN_ARROW) && target.nextElementSibling) {
            (<HTMLElement>target.nextElementSibling).focus();
        } else if (this.isListMode() && KeyUtil.isKeyCode(event, UP_ARROW) && target.previousElementSibling) {
            (<HTMLElement>target.previousElementSibling).focus();
        }
    }
}
