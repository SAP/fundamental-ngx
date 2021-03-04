import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { ShellbarMenuItem } from '../model/shellbar-menu-item';
import { Placement, PopoverFillMode } from '../../popover/popover-position/popover-position';

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
export class ProductMenuComponent {

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey = true;

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick = true;

    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement = 'bottom-end';

    /** Whether the popover is disabled. */
    @Input()
    disabled = false;

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: PopoverFillMode = null;

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

    /** When set to true, popover list will be closed after selecting the option */
    @Input()
    closePopoverOnSelect = false;

    /** @hidden */
    @ViewChild(MenuComponent)
    menu: MenuComponent;

    /** @hidden */
    itemClicked(item: any, event: any): void {
        if (this.closePopoverOnSelect) {
            this.menu.close();
        }
        if (item.callback) {
            item.callback(event);
        }
    }
}
