import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdDynamicPageWrapper], [fd-dynamic-page-wrapper]',
    standalone: true
})
export class DynamicPageWrapperDirective {
    /** @ignore */
    constructor(public elementRef: ElementRef<HTMLElement>) {}
}
