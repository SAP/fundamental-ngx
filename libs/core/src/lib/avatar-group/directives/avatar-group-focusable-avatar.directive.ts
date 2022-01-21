import { Directive, ElementRef, Optional, HostBinding, HostListener, Input, Inject, forwardRef } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

import { AvatarGroupOverflowBodyDirective } from './avatar-group-overflow-body.directive';
import { AvatarGroupInterface } from '../avatar-group.interface';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-focusable-avatar]',
    host: { class: 'fd-avatar-group__focusable-avatar' }
})
export class AvatarGroupFocusableAvatarDirective implements FocusableOption {
    /** Tabindex of the Avatar. */
    @Input()
    @HostBinding('attr.tabindex')
    tabindex = 0;

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        @Optional()
        @Inject(forwardRef(() => AvatarGroupOverflowBodyDirective))
        private readonly _component: AvatarGroupInterface
    ) {}

    /** @hidden */
    get _element(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** Handler for mouse events */
    @HostListener('click')
    onClick(): void {
        if (this._component) {
            this._component._setActiveItem(this);
        }
    }

    /** @hidden */
    focus(): void {
        this._element.focus();
    }
}
