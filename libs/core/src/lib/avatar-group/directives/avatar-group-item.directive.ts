import { Directive, ElementRef, Host, HostListener } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

import { AvatarGroupComponent } from '../avatar-group.component';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-item]',
    host: { class: 'fd-avatar-group__item' }
})
export class AvatarGroupItemDirective implements FocusableOption {
    disabled = false;

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        @Host() private readonly _component: AvatarGroupComponent
    ) {}

    /** @hidden */
    get _element(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** Handler for mouse events */
    @HostListener('click')
    onClick(): void {
        this._component._setActiveItem(this);
    }

    /** @hidden */
    focus(): void {
        this._element.focus();
    }
}
