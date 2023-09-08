import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'input[fd-form-control][fd-menu-item-input]',
    host: {
        class: 'fd-menu__input'
    },
    standalone: true
})
export class MenuItemInputDirective implements HasElementRef {
    /** @hidden */
    elementRef = inject(ElementRef);

    /**
     * This is needed to prevent the click event from bubbling up to the menu item
     * and potentially closing the menu or triggering other actions.
     */
    @HostListener('keydown', ['$event'])
    @HostListener('click', ['$event'])
    onInteraction($event: KeyboardEvent | MouseEvent): void {
        if ($event.target === this.elementRef.nativeElement) {
            $event.stopPropagation();
        }
    }
}
