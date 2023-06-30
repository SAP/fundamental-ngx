import { Directive, TemplateRef, inject } from '@angular/core';
import { DynamicPageTitleDirectiveContext } from '../models/title-directive-context';

@Directive({
    selector: '[fdDynamicPageHeaderTitle]',
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
