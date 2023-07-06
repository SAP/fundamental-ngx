import { Directive, ElementRef, Optional, HostBinding, HostListener, Input, Inject, forwardRef } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

import { HasElementRef } from '@fundamental-ngx/cdk/utils';

import { AvatarGroupOverflowBodyDirective } from './avatar-group-overflow-body.directive';
import { AvatarGroupInterface } from '../avatar-group.interface';
import { AVATAR_GROUP_FOCUSABLE_AVATAR_DIRECTIVE } from '../tokens';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-focusable-avatar]',
    host: { class: 'fd-avatar-group__focusable-avatar' },
    providers: [
        {
            provide: AVATAR_GROUP_FOCUSABLE_AVATAR_DIRECTIVE,
            useExisting: forwardRef(() => AvatarGroupFocusableAvatarDirective)
        }
    ],
    standalone: true
})
export class AvatarGroupFocusableAvatarDirective implements FocusableOption, HasElementRef {
    /** Tabindex of the Avatar. */
    @Input()
    @HostBinding('attr.tabindex')
    tabindex = 0;

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        @Optional()
        @Inject(forwardRef(() => AvatarGroupOverflowBodyDirective))
        private readonly _component: AvatarGroupInterface
    ) {}

    /** Handler for mouse events */
    @HostListener('click')
    onClick(): void {
        if (this._component) {
            this._component._setActiveItem(this);
        }
    }

    /** @hidden */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
