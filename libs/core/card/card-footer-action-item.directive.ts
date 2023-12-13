import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdCardFooterActionItem]',
    standalone: true
})
export class CardFooterActionItemDirective {
    /** @ignore */
    constructor(readonly templateRef: TemplateRef<void>) {}
}
