import { Directive, Input, TemplateRef } from '@angular/core';
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
}
