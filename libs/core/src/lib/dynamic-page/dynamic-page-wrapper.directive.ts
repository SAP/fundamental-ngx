import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdDynamicPageWrapper], [fd-dynamic-page-wrapper]'
})
export class DynamicPageWrapperDirective {
    constructor(public elementRef: ElementRef<HTMLElement>) {}
}
