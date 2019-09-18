import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';

/**
 * This Component extends popover component and passes all of the options and events from outside to popover component
 * and Vice Versa
 * */
@Component({
    selector: 'fd-shellbar-user-menu',
    templateUrl: './shellbar-user-menu.component.html'
})
export class ShellbarUserMenuComponent extends PopoverComponent {

    /** The user data. */
    @Input()
    user: any;

    /** The user menu data. */
    @Input()
    userMenu: any[];

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
