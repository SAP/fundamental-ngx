import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdMessageStripIcon]',
    standalone: true
})
export class MessageStripIconDirective {
    /** @ignore */
    constructor(readonly templateRef: TemplateRef<void>) {}
}
