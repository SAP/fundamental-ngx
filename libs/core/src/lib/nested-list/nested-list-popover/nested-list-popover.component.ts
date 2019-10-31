import { Component, ContentChild, HostBinding, ViewChild, ViewEncapsulation } from '@angular/core';
import { NestedItemDirective } from '../nested-item/nested-item.directive';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { PopoverComponent } from '../../popover/popover.component';

@Component({
    selector: 'fd-nested-list-popover',
    templateUrl: './nested-list-popover.component.html',
    styleUrls: ['./nested-list-popover.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NestedListPopoverComponent {

    /** @hidden */
    @ViewChild(PopoverComponent, { static: false })
    popoverComponent: PopoverComponent;

    /** @hidden */
    @HostBinding('class.fd-nested-list__popover')
    popoverClass: boolean = true;

    /** @hidden */
    @ContentChild(NestedLinkDirective, { static: false })
    linkDirective: NestedLinkDirective;

    /** @hidden */
    constructor(
        private keyboardNestService: NestedListKeyboardService
    ) {
        this.keyboardNestService.refresh$.subscribe(() => {
            /** Update popover position, on list of hidden items change */
            if (this.popoverComponent) {
                this.popoverComponent.updatePopover();
            }
        });
    }

    /**
     * @hidden
     * Reference to parent item, to propagate open and close change from popover.
     */
    parentItemElement: NestedItemDirective;

    /**
     * @hidden
     */
    open: boolean = false;

    /**
     * Method called, when open state is changed, from popover component (escape key, outside click).
     */
    handleOpenChange(open: boolean): void {
        this.open = open;
        if (this.parentItemElement) {
            if (open) {
                this.parentItemElement.triggerOpen();
            } else {
                this.parentItemElement.triggerClose();
            }
        }
    }
}
