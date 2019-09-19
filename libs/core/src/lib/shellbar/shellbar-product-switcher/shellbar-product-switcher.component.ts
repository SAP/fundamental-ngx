import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';

/**
 * This Component extends popover component and passes all of the options and events from outside to popover component
 * and Vice Versa
 * */
@Component({
    selector: 'fd-shellbar-product-switcher',
    templateUrl: './shellbar-product-switcher.component.html',
    styleUrls: ['./shellbar-product-switcher.component.scss']
})
export class ShellbarProductSwitcherComponent extends PopoverComponent {

    /** The product switcher data. */
    @Input()
    productSwitcher: any[];

    /** Event emitted on item click */
    @Output()
    itemClicked: EventEmitter<void> = new EventEmitter<void>();

    /**
     * @hidden
     */
    itemClick(item: any, event: any): void {
        this.itemClicked.emit();
        item.callback(event);
    }
}
