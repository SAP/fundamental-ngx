import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdCardFooterActionItem]'
})
export class CardFooterActionItemDirective {
    /** @hidden */
    readonly templateRef = inject(TemplateRef<void>);
}
