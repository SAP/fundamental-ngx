import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdCardFooterActionItem]'
})
export class CardFooterActionItemDirective {
    /** @hidden */
    constructor(readonly templateRef: TemplateRef<void>) {}
}
