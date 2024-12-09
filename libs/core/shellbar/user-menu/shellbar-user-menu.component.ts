import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuComponent, MenuModule } from '@fundamental-ngx/core/menu';
import { Placement, PopoverFillMode } from '@fundamental-ngx/core/shared';
import { ShellbarUser } from '../model/shellbar-user';
import { ShellbarUserMenu } from '../model/shellbar-user-menu';
import { ShellbarUserMenuButtonDirective } from './shellbar-user-menu-button.directive';

/**
 * This Component extends popover component and passes all the options and events from outside to popover component
 * and Vice Versa
 * */
@Component({
    selector: 'fd-shellbar-user-menu',
    templateUrl: './shellbar-user-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, MenuModule, AvatarComponent, ShellbarUserMenuButtonDirective]
})
export class ShellbarUserMenuComponent {
    /** The user data. */
    @Input()
    user: ShellbarUser;

    /** The user menu data. */
    @Input()
    userMenu: ShellbarUserMenu[];

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: Nullable<PopoverFillMode>;

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement = 'bottom-end';

    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey = true;

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick = true;

    /** Whether the popover is disabled. */
    @Input()
    disabled = false;

    /** Whether or not to show the popover arrow */
    @Input()
    noArrow = false;

    /** Event emitted on item click */
    @Output()
    itemClicked: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    @ViewChild(MenuComponent)
    _menu: MenuComponent;

    /** @hidden */
    @ContentChild(MenuComponent)
    _contentPassedMenu: MenuComponent;

    /** @hidden */
    @ContentChild(ShellbarUserMenuButtonDirective)
    _shellbarUserMenuButton: ShellbarUserMenuButtonDirective;

    /** Reference to Menu Component */
    get menu(): MenuComponent {
        return this._contentPassedMenu || this._menu;
    }

    /**
     * @hidden
     */
    itemClick(item: ShellbarUserMenu, event: MouseEvent): void {
        this.itemClicked.emit();
        if (item.callback) {
            item.callback(event);
        }
    }
}
