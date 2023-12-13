import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdpSmartFilterBarToolbarItem]',
    standalone: true
})
export class SmartFilterBarToolbarItemDirective {
    /** @ignore */
    constructor(public templateRef: TemplateRef<any>) {}
}
