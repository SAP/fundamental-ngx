import { OnInit } from '@angular/core';
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
export declare class ProductMenuComponent implements OnInit {
    /** @hidden */
    popoverComponent: PopoverComponent;
    /**
     * The control element to toggle the product menu,
     * represented by the name of the current application.
     */
    control: string;
    /** The items in the product menu. */
    items: any[];
    /** @hidden */
    productMenuCollapsed: boolean;
    /** When set to true, popover list will be closed after selecting the option */
    closePopoverOnSelect: boolean;
    /** @hidden */
    onResize(): void;
    /** @hidden */
    ngOnInit(): void;
    /**
     * @hidden
     */
    itemClicked(item: any, event: any): void;
}
