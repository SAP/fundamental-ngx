import { Directive, inject, TemplateRef } from '@angular/core';
import { ValueHelpFilterDef, ValueHelpFilterDefContext } from '../models/vhd-filter.model';

@Directive({
    selector: '[fdpValueHelpFilterDef]',
    standalone: true
})
export class ValueHelpFilterDefDirective implements ValueHelpFilterDef {
    /** Template reference */
    readonly templateRef = inject<TemplateRef<ValueHelpFilterDefContext>>(TemplateRef);

    /** @hidden */
    static ngTemplateContextGuard(dir: ValueHelpFilterDefDirective, ctx: unknown): ctx is ValueHelpFilterDefContext {
        return true;
    }
}
