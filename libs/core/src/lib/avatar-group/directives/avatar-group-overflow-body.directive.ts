import { Directive, inject, TemplateRef } from '@angular/core';
import { AvatarGroupItemRendererDirective } from './avatar-group-item-renderer.directive';

/**
 * Avatar group overflow body directive, used to provide a template for the avatar group overflow body.
 * If nothing is provided, default overflow body will be used.
 */
@Directive({
    selector: '[fdAvatarGroupOverflowBody]',
    standalone: true
})
export class AvatarGroupOverflowBodyDirective {
    /** @hidden */
    readonly templateRef: TemplateRef<{ hiddenItems: AvatarGroupItemRendererDirective[] }> = inject(TemplateRef);
}
