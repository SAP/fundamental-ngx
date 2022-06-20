import { TemplateRef } from '@angular/core';
import { OverflowItemRef } from './overflow-item-ref.interface';

export type OverflowExpandDirectiveContext = { $implicit: OverflowItemRef[] };

export interface OverflowExpand {
    /**
     * Template reference of the directive.
     */
    templateRef: TemplateRef<OverflowExpandDirectiveContext>;
}
