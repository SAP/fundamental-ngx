import { ChangeDetectionStrategy, Component, ContentChild, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';
import { MenuComponent } from '../../menu/menu.component';
import { ShellbarMenuItem } from '../model/shellbar-menu-item';

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
    styleUrls: ['./product-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductMenuComponent extends PopoverComponent implements OnInit {

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** @hidden */
    @ContentChild(MenuComponent)
    menuComponent: MenuComponent;

    /**
     * The control element to toggle the product menu,
     * represented by the name of the current application.
     */
    @Input()
    control: string;

    /**
     *  The items in the product menu. If the value is not passed or there is empty array,
     * the template changes and shows only control
     */
    @Input()
    items: ShellbarMenuItem[];

    /** @hidden */
    productMenuCollapsed: boolean = false;

    /** When set to true, popover list will be closed after selecting the option */
    @Input()
    closePopoverOnSelect: boolean = false;

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        const mq = window.matchMedia('(max-width: 601px)');
        mq.matches ? this.productMenuCollapsed = true : this.productMenuCollapsed = false;
    }

    /** @hidden */
    ngOnInit(): void {
        this.onResize();
    }

    /**
     * @hidden
     */
    itemClicked(item: any, event: any): void {
        if (this.closePopoverOnSelect) {
            this.popoverComponent.close();
        }
        if (item.callback) {
            item.callback(event);
        }
    }

    /**
    * @hidden
    */
    isAnyGlyphInItems(): boolean {
        if (!this.items || this.items.length === 0) {
            return false;
        }
        return !!this.items.find(item => item.glyph);
    }
}
