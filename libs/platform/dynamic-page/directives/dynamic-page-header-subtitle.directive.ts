import { Directive, TemplateRef, inject } from '@angular/core';
import { DynamicPageTitleDirectiveContext } from '@fundamental-ngx/core/dynamic-page';

@Directive({
    selector: '[fdpDynamicPageHeaderSubtitle]',
    standalone: true
})
export class DynamicPageHeaderSubtitleDirective {
    /** Template reference. */
    templateRef = inject<TemplateRef<DynamicPageTitleDirectiveContext>>(TemplateRef);

    /** @hidden */
    static ngTemplateContextGuard(
        dir: DynamicPageHeaderSubtitleDirective,
        ctx: DynamicPageTitleDirectiveContext
    ): ctx is DynamicPageTitleDirectiveContext {
        return true;
    }
}
