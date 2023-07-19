import { Directive, TemplateRef, inject } from '@angular/core';
import { DynamicPageTitleDirectiveContext } from '../models/title-directive-context';

@Directive({
    selector: '[fdDynamicPageHeaderSubtitle]',
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
