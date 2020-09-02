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
import { FdDropEvent } from '../../utils/drag-and-drop/dnd-list/dnd-list.directive';
import { KeyUtil } from '../../utils/public_api';

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
        this.checkSize();
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
        this.checkSize();
    }

    /** @hidden */
    keyDownHandle(event: KeyboardEvent): void {
        const target = (<HTMLElement>event.target);
        if (!KeyUtil.isKey(event, 'Tab')) {
            event.preventDefault();
        }
        if (KeyUtil.isKey(event, ['Enter', ' '])) {
            target.click();
        } else if (!this.isListMode()) {
            this.handleNoListKeydown(event);
        } else if (this.isListMode() && KeyUtil.isKey(event, ['ArrowDown', 'ArrowUp'])) {
            this.handleListArrowUpDown(event);
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
    private checkSize(): void {
        if (this.isSmallMode()) {
            this.listMode = window.innerWidth < 588;
        } else {
            this.listMode = window.innerWidth < 776;
        }
    }

    /** @hidden */
    private handleNoListKeydown(event: KeyboardEvent): void {
        const target = (<HTMLElement>event.target);
        if (KeyUtil.isKey(event, 'ArrowLeft') && target.previousElementSibling) {
            (<HTMLElement>target.previousElementSibling).focus();
        } else if (KeyUtil.isKey(event, 'ArrowRight') && target.nextElementSibling) {
            (<HTMLElement>target.nextElementSibling).focus();
        } else if (KeyUtil.isKey(event, ['ArrowDown', 'ArrowUp'])) {
            if (this.products.length >= 7) {
                this.handleNoListMoreThanSeven(event);
            } else if (this.products.length < 7) {
                this.handleNoListLessThanSeven(event);
            }
        }
    }

    /** @hidden */
    private handleNoListMoreThanSeven(event: KeyboardEvent): void {
        const target = (<HTMLElement>event.target);
        if (KeyUtil.isKey(event, 'ArrowDown')) {
            if (target.nextElementSibling && target.nextElementSibling.nextElementSibling &&
                target.nextElementSibling.nextElementSibling.nextElementSibling &&
                target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling) {
                (<HTMLElement>target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling).focus();
            }
        }
        if (KeyUtil.isKey(event, 'ArrowUp')) {
            if (target.previousElementSibling && target.previousElementSibling.previousElementSibling &&
                target.previousElementSibling.previousElementSibling.previousElementSibling &&
                target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling) {
                (<HTMLElement>target.previousElementSibling.previousElementSibling.previousElementSibling
                    .previousElementSibling).focus();
            }
        }
    }

    /** @hidden */
    private handleNoListLessThanSeven(event: KeyboardEvent): void {
        const target = (<HTMLElement>event.target);
        if (KeyUtil.isKey(event, 'ArrowDown')) {
            if (target.nextElementSibling && target.nextElementSibling.nextElementSibling &&
                target.nextElementSibling.nextElementSibling.nextElementSibling) {
                (<HTMLElement>target.nextElementSibling.nextElementSibling.nextElementSibling).focus();
            }
        }
        if (KeyUtil.isKey(event, 'ArrowUp')) {
            if (target.previousElementSibling && target.previousElementSibling.previousElementSibling &&
                target.previousElementSibling.previousElementSibling.previousElementSibling) {
                (<HTMLElement>target.previousElementSibling.previousElementSibling.previousElementSibling).focus();
            }
        }
    }

    /** @hidden */
    private handleListArrowUpDown(event: KeyboardEvent): void {
        const target = (<HTMLElement>event.target);
        if (this.isListMode() && KeyUtil.isKey(event, 'ArrowDown') && target.nextElementSibling) {
            (<HTMLElement>target.nextElementSibling).focus();
        } else if (this.isListMode() && KeyUtil.isKey(event, 'ArrowUp') && target.previousElementSibling) {
            (<HTMLElement>target.previousElementSibling).focus();
        }
    }
}
