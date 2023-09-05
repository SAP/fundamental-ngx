import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdPopoverBody]',
    standalone: true
})
export class PopoverBodyDirective {
    /**
     * The template to be used as the popover's body.
     **/
    readonly templateRef = inject<TemplateRef<void>>(TemplateRef);
}
