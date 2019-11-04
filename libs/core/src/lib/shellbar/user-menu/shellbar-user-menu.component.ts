import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';
import { ShellbarMenuItem } from '../model/shellbar-menu-item';
import { ShellbarUser } from '../model/shellbar-user';
import { ShellbarUserMenu } from '../model/shellbar-user-menu';

/**
 * This Component extends popover component and passes all of the options and events from outside to popover component
 * and Vice Versa
 * */
@Component({
    selector: 'fd-shellbar-user-menu',
    templateUrl: './shellbar-user-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellbarUserMenuComponent extends PopoverComponent {

    /** The user data. */
    @Input()
    user: ShellbarUser;

    /** The user menu data. */
    @Input()
    userMenu: ShellbarUserMenu[];

    /** Event emitted on item click */
    @Output()
    itemClicked: EventEmitter<void> = new EventEmitter<void>();

    /**
     * @hidden
     */
    itemClick(item: ShellbarUserMenu, event: any): void {
        this.itemClicked.emit();
        if (item.callback) {
            item.callback(event);
        }
    }
}
