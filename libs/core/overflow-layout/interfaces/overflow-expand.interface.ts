import { TemplateRef } from '@angular/core';
import { OverflowItemRef } from './overflow-item-ref.interface';

export type OverflowExpandDirectiveContext<T extends any[] = any[]> = { $implicit: OverflowItemRef<T[number]>[] };

export interface OverflowExpand<T extends any[] = any[]> {
    /**
     * Template reference of the directive.
     */
    templateRef: TemplateRef<OverflowExpandDirectiveContext<T>>;
}
