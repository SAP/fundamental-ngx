import { Component, HostListener, Input, OnInit } from '@angular/core';

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
    templateUrl: './product-menu.component.html'
})
export class ProductMenuComponent implements OnInit {

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

}
