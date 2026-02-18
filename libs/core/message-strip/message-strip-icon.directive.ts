import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[fdMessageStripIcon]'
})
export class MessageStripIconDirective {
    readonly templateRef = inject(TemplateRef);
}
