import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdpSmartFilterBarToolbarItem]',
    standalone: true
})
export class SmartFilterBarToolbarItemDirective {
    /** @hidden */
    constructor(public templateRef: TemplateRef<any>) {}
}
