import { Directive, ElementRef, inject, Input, TemplateRef } from '@angular/core';
import { AVATAR_GROUP_HOST_CONFIG } from '../tokens';
import { DestroyedService, FDK_FOCUSABLE_ITEM_DIRECTIVE, FocusableItemDirective } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: 'fd-avatar[fdAvatarGroupItem]',
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: FocusableItemDirective
        },
        DestroyedService
    ]
})
export class AvatarGroupItemDirective extends FocusableItemDirective {
    /** @hidden */
    @Input()
    forceVisibility = false;

    /** @hidden */
    @Input()
    details?: TemplateRef<any>;

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    avatarGroupHostConfig = inject(AVATAR_GROUP_HOST_CONFIG);

    /** @hidden */
    constructor() {
        super();
        this.fdkFocusableItem = this.avatarGroupHostConfig.type === 'individual';
    }
}
