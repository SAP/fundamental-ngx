import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdCardFooterActionItem]'
})
export class CardFooterActionItemDirective {
    constructor(readonly templateRef: TemplateRef<void>) {}
}
