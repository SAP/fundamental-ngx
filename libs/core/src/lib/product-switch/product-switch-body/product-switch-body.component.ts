import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ProductSwitchItem } from './product-switch.item';

@Component({
    selector: 'fd-product-switch-body',
    templateUrl: './product-switch-body.component.html',
    styleUrls: ['./product-switch-body.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSwitchBodyComponent implements OnInit {

    /** Defines if drag and drop functionality should be included in product switch*/
    @Input()
    dragAndDropEnabled: boolean = true;

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
    forceListMode: boolean = false;

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
    productSwitchItemsChangeHandle(items: any[]): void {
        this.productsChange.emit(items);
        this.products = items;
    }

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        this.checkSize();
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
}
