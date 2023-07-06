import { Directive, ElementRef, HostListener, Inject, Optional } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { AvatarGroupInterface } from '../avatar-group.interface';
import { AVATAR_GROUP_COMPONENT } from '../tokens';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-item]',
    standalone: true
})
export class AvatarGroupItemDirective implements FocusableOption {
    /** Item disable state */
    disabled = false;

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(AVATAR_GROUP_COMPONENT) private readonly _component: AvatarGroupInterface
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
