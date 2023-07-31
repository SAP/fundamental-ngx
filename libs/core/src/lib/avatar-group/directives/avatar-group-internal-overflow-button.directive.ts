import { Directive, EmbeddedViewRef, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AvatarGroupItemRendererDirective } from './avatar-group-item-renderer.directive';

@Directive({
    selector: '[fdAvatarGroupInternalOverflowButton]',
    standalone: true
})
export class AvatarGroupInternalOverflowButtonDirective {
    /** @hidden */
    @Input('fdAvatarGroupInternalOverflowButton')
    set hiddenItems(value: AvatarGroupItemRendererDirective[] | null) {
        const hiddenItems = value || [];
        console.log({ hiddenItems });
        if (hiddenItems.length > 0) {
            this.show(hiddenItems);
        } else {
            this.hide();
        }
    }

    /** @hidden */
    readonly templateRef: TemplateRef<{ $implicit: AvatarGroupItemRendererDirective[] }> = inject(TemplateRef);
    /** @hidden */
    readonly viewContainerRef = inject(ViewContainerRef);
    /** @hidden */
    private embeddedView?: EmbeddedViewRef<any>;

    /** @hidden */
    show(hiddenItems: AvatarGroupItemRendererDirective[]): void {
        const context = { $implicit: hiddenItems };
        if (this.embeddedView) {
            this.embeddedView.context = context;
            this.embeddedView.detectChanges();
            return;
        }
        this.viewContainerRef.clear();
        this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef, context);
        this.embeddedView.detectChanges();
    }

    /** @hidden */
    hide(): void {
        this.viewContainerRef.clear();
        this.embeddedView = undefined;
    }
}
