import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdpSmartFilterBarToolbarItem]'
})
export class SmartFilterBarToolbarItemDirective {
    /** @hidden */
    constructor(public templateRef: TemplateRef<any>) {}
}
