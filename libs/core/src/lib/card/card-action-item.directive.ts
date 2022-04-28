import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdCardActionItem]'
})
export class CardActionItemDirective {
    constructor(readonly templateRef: TemplateRef<void>) {}
}
