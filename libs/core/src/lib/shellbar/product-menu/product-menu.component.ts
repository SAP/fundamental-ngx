import { Component, HostListener, Input, OnInit, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';

/**
 * The component that represents a product menu.
 * Product menu is used for navigating to applications within the product.
 * ```html
 * <fd-product-menu [control]="productMenuControl"
 *                  [items]="productMenuItems">
 * </fd-product-menu>
 * ```
 */
@Component({
    selector: 'fd-product-menu',
    templateUrl: './product-menu.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProductMenuComponent implements OnInit {

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** 
     * The control element to toggle the product menu,
     * represented by the name of the current application. 
     */
    @Input()
    control: string;

    /** The items in the product menu. */
    @Input()
    items: any[];

    /** @hidden */
    productMenuCollapsed: boolean = false;

    /** When set to true, popover list will be closed after selecting the option */
    @Input()
    closePopoverOnSelect: boolean = false;

    /** @hidden */
    @HostListener('window:resize', [])
    onResize() {
        const mq = window.matchMedia('(max-width: 601px)');
        mq.matches ? this.productMenuCollapsed = true : this.productMenuCollapsed = false;
    }

    /** @hidden */
    ngOnInit() {
        this.onResize();
    }

    /**
     * @hidden
     */
    itemClicked(item: any, event: any): void {
        if (this.closePopoverOnSelect) {
            this.popoverComponent.close();
        }
        item.callback(event);
    }

}
