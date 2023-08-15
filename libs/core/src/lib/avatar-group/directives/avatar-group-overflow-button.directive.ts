import { Directive, inject, TemplateRef } from '@angular/core';
import { AvatarGroupItemRendererDirective } from './avatar-group-item-renderer.directive';

/**
 * Avatar group overflow button directive, used to provide a template for the avatar group overflow button.
 * If nothing is provided, default overflow button will be used.
 */
@Directive({
    selector: '[fdAvatarGroupOverflowButton]',
    standalone: true
})
export class AvatarGroupOverflowButtonDirective {
    /** @hidden */
    readonly templateRef: TemplateRef<{ hiddenItems: AvatarGroupItemRendererDirective[] }> = inject(TemplateRef);
}
