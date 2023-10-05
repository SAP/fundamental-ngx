import { Directive, inject, Input, TemplateRef } from '@angular/core';

/**
 * Avatar group item directive, used to provide a template for the avatar group item.
 */
@Directive({
    selector: '[fdAvatarGroupItem]',
    standalone: true
})
export class AvatarGroupItemDirective {
    /**
     * Text, which will be displayed when in overflow popover and activated
     * */
    @Input('fdAvatarGroupItemTitle')
    title: string;

    /**
     * If set to true, item will never be hidden in overflow popover
     * */
    @Input('fdAvatarGroupItemForceVisibility')
    forceVisibility = false;

    /** @hidden */
    _templateRef: TemplateRef<void> = inject(TemplateRef);

    /**
     * Template for the details of the avatar group item.
     * This template it used to render additional information in the overflow popover.
     * */
    @Input('fdAvatarGroupItem')
    set details(detailsTemplate: TemplateRef<void> | string) {
        if (typeof detailsTemplate === 'string') {
            return;
        }
        this._details = detailsTemplate;
    }

    get details(): TemplateRef<void> {
        return this._details;
    }

    /** @hidden */
    private _details: TemplateRef<void>;
}
