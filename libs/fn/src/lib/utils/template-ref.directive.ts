import { Directive, TemplateRef } from '@angular/core';
import { TemplateRefProviderToken } from './template-ref-provider.token';

@Directive()
export class TemplateRefDirective<ContextType = any> implements TemplateRefProviderToken<ContextType> {
    constructor(readonly templateRef: TemplateRef<ContextType>) {}
}
