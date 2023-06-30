import { Directive, TemplateRef, inject } from '@angular/core';
import { DynamicPageTitleDirectiveContext } from '@fundamental-ngx/core/dynamic-page';

@Directive({
    selector: '[fdpDynamicPageHeaderTitle]',
    standalone: true
})
export class DynamicPageHeaderTitleDirective {
    /** Template reference. */
    templateRef = inject<TemplateRef<DynamicPageTitleDirectiveContext>>(TemplateRef);

    /** @hidden */
    static ngTemplateContextGuard(
        dir: DynamicPageHeaderTitleDirective,
        ctx: DynamicPageTitleDirectiveContext
    ): ctx is DynamicPageTitleDirectiveContext {
        return true;
    }
}
