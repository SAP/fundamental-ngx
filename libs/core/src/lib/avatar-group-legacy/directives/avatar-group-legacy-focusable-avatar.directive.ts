import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef, HostBinding, HostListener, Inject, Input, Optional, forwardRef } from '@angular/core';

import { HasElementRef } from '@fundamental-ngx/cdk/utils';

import { AvatarGroupLegacyInterface } from '../avatar-group-legacy.interface';
import { AVATAR_GROUP_LEGACY_FOCUSABLE_AVATAR_DIRECTIVE } from '../tokens';
import { AvatarGroupLegacyOverflowBodyDirective } from './avatar-group-legacy-overflow-body.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-legacy-focusable-avatar]',
    host: { class: 'fd-avatar-group-legacy__focusable-avatar' },
    providers: [
        {
            provide: AVATAR_GROUP_LEGACY_FOCUSABLE_AVATAR_DIRECTIVE,
            useExisting: forwardRef(() => AvatarGroupLegacyFocusableAvatarDirective)
        }
    ],
    standalone: true
})
export class AvatarGroupLegacyFocusableAvatarDirective implements FocusableOption, HasElementRef {
    /** Tabindex of the Avatar. */
    @Input()
    @HostBinding('attr.tabindex')
    tabindex = 0;

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        @Optional()
        @Inject(forwardRef(() => AvatarGroupLegacyOverflowBodyDirective))
        private readonly _component: AvatarGroupLegacyInterface
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
