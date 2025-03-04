import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostListener,
    QueryList,
    ViewEncapsulation,
    booleanAttribute,
    input
} from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { UserMenuListItemComponent } from './user-menu-list-item.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-sublist]',
    template: `<ul class="fd-menu__list fd-user-menu__menu-list" role="menu">
        <ng-content></ng-content>
    </ul> `,
    host: {
        class: 'fd-menu fd-user-menu__menu',
        '[class.fd-menu--icons]': 'hasIcons()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class UserMenuSublistComponent implements AfterViewInit {
    @ContentChildren(UserMenuListItemComponent) private _menuItems: QueryList<UserMenuListItemComponent>;

    hasIcons = input(false, { transform: booleanAttribute });

    private _keyManager: FocusKeyManager<UserMenuListItemComponent>;

    /** HostListener for keyboard navigation (up and down arrows) */
    @HostListener('keydown', ['$event'])
    private _keyDownHandler(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW])) {
            return;
        }

        event.preventDefault(); // Prevent default action (scrolling)
        this._keyManager.onKeydown(event); // Delegate to FocusKeyManager for navigation
    }

    ngAfterViewInit(): void {
        // Initialize FocusKeyManager with the list items
        this._keyManager = new FocusKeyManager(this._menuItems);

        // Configure the FocusKeyManager
        this._keyManager.withVerticalOrientation().setActiveItem(0); // Set the first item as active

        if (this._menuItems.length > 0) {
            this._menuItems.first.tabindex = 0;
        }
    }
}
