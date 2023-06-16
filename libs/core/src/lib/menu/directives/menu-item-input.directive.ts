import { Directive, HostListener } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'input[fd-form-control][fd-menu-item-input]',
    host: {
        class: 'fd-menu__input'
    },
    standalone: true
})
export class MenuItemInputDirective {
    /**
     * This is needed to prevent the click event from bubbling up to the menu item
     * and potentially closing the menu or triggering other actions.
     */
    @HostListener('keydown', ['$event'])
    @HostListener('click', ['$event'])
    onInteraction($event: KeyboardEvent | MouseEvent): void {
        $event.stopPropagation();
    }
}
