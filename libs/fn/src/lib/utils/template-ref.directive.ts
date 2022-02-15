import { Directive, TemplateRef } from '@angular/core';

@Directive()
export class TemplateRefDirective<ContextType = any> {
    constructor(readonly templateRef: TemplateRef<ContextType>) {}
}
