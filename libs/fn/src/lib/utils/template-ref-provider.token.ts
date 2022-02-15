import { TemplateRef } from '@angular/core';

export abstract class TemplateRefProviderToken<ContextType = any> {
    abstract templateRef: TemplateRef<ContextType>;
}
