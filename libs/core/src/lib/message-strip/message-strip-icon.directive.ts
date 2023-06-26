import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdMessageStripIcon]',
    standalone: true
})
export class MessageStripIconDirective {
    /** @hidden */
    constructor(readonly templateRef: TemplateRef<void>) {}
}
