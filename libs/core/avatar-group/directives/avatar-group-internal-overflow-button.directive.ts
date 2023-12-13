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

    /** @ignore */
    private readonly _templateContext: { $implicit: AvatarGroupItemRendererDirective[] } = { $implicit: [] };
    /** @ignore */
    private readonly _templateRef: TemplateRef<{ $implicit: AvatarGroupItemRendererDirective[] }> = inject(TemplateRef);
    /** @ignore */
    private readonly _viewContainerRef = inject(ViewContainerRef);
    /** @ignore */
    private _embeddedView?: EmbeddedViewRef<any>;

    /** @ignore */
    static ngTemplateContextGuard(
        _directive: AvatarGroupInternalOverflowButtonDirective,
        context: unknown
    ): context is { $implicit: AvatarGroupItemRendererDirective[] } {
        return true;
    }
    /** @ignore */
    ngOnDestroy(): void {
        this._hide();
    }

    /** @ignore */
    private _show(hiddenItems: AvatarGroupItemRendererDirective[]): void {
        this._templateContext.$implicit = hiddenItems;
        if (this._embeddedView) {
            this._embeddedView.detectChanges();
            return;
        }
        this._viewContainerRef.clear();
        this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef, this._templateContext);
        this._embeddedView.detectChanges();
    }

    /** @ignore */
    private _hide(): void {
        this._viewContainerRef.clear();
        this._embeddedView = undefined;
    }
}
