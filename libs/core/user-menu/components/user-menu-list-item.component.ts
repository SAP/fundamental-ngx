import {
    ChangeDetectionStrategy,
    Component,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    input
} from '@angular/core';

let uniqueId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-list-item]',
    templateUrl: './user-menu-list-item.component.html',
    host: {
        class: 'fd-menu__item',
        role: 'menuitem',
        tabindex: '0',
        '[attr.id]': 'uniqueId()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class UserMenuListItemComponent {
    /**
     * Unique id for the menu list item
     * if not set, a default value is provided
     */
    uniqueId = input('fd-menu-list-item-' + ++uniqueId);

    /**
     * Icon name for the menu list item
     * optional, sting value
     */
    addon = input<string>();

    /**
     * Text for the menu list item
     * required, sting value
     */
    title = input.required<string>();

    /**
     * Template ref for user menu list item submenu
     */
    submenu = input<TemplateRef<any>>();

    /**
     * Whether the item is selected
     */
    selected = input(false, { transform: booleanAttribute });
}
