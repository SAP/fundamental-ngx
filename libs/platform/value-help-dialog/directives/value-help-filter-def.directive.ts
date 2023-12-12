import { Directive, TemplateRef, inject } from '@angular/core';
import { VhdFilter } from '../models/vhd-filter.model';

interface ValueHelpFilterDefContext {
    $implicit: VhdFilter;
}

@Directive({
    selector: '[fdpValueHelpFilterDef]',
    standalone: true
})
export class ValueHelpFilterDefDirective {
    /** Template reference */
    readonly templateRef = inject(TemplateRef<ValueHelpFilterDefContext>);

    /** @hidden */
    static ngTemplateContextGuard(dir: ValueHelpFilterDefDirective, ctx: unknown): ctx is ValueHelpFilterDefContext {
        return true;
    }
}
