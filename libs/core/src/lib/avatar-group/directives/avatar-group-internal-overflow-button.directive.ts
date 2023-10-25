import { Directive, EmbeddedViewRef, inject, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AvatarGroupItemRendererDirective } from './avatar-group-item-renderer.directive';

@Directive({
    selector: '[fdAvatarGroupInternalOverflowButton]',
    standalone: true
})
export class AvatarGroupInternalOverflowButtonDirective implements OnDestroy {
    /**
     * List of hidden items to be rendered in the overflow popover.
     **/
    @Input('fdAvatarGroupInternalOverflowButton')
    set hiddenItems(value: AvatarGroupItemRendererDirective[] | null) {
        const hiddenItems = value || [];
        if (hiddenItems.length > 0) {
            this._show(hiddenItems);
        } else {
            this._hide();
        }
    }

    /** @hidden */
    private readonly _templateRef: TemplateRef<{ $implicit: AvatarGroupItemRendererDirective[] }> = inject(TemplateRef);
    /** @hidden */
    private readonly _viewContainerRef = inject(ViewContainerRef);
    /** @hidden */
    private _embeddedView?: EmbeddedViewRef<any>;

    /** @hidden */
    static ngTemplateContextGuard(
        _directive: AvatarGroupInternalOverflowButtonDirective,
        context: unknown
    ): context is { $implicit: AvatarGroupItemRendererDirective[] } {
        return true;
    }
    /** @hidden */
    ngOnDestroy(): void {
        this._hide();
    }

    /** @hidden */
    private _show(hiddenItems: AvatarGroupItemRendererDirective[]): void {
        const context = { $implicit: hiddenItems };
        if (this._embeddedView) {
            this._embeddedView.context = context;
            this._embeddedView.detectChanges();
            return;
        }
        this._viewContainerRef.clear();
        this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef, context);
        this._embeddedView.detectChanges();
    }

    /** @hidden */
    private _hide(): void {
        this._viewContainerRef.clear();
        this._embeddedView = undefined;
    }
}
