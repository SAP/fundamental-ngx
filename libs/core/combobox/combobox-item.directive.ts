import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { ComboboxItemDirectiveContext } from './combobox.interface';

@Directive({
    selector: '[fdComboboxItem]',
    standalone: true
})
export class ComboboxItemDirective<T = unknown> {
    /**
     * @ignore
     * Used for type support.
     */
    @Input()
    fdComboboxItemUse: T;

    /** Template reference. */
    templateRef = inject(TemplateRef<ComboboxItemDirectiveContext<T>>);

    /** @ignore */
    static ngTemplateContextGuard<T>(
        dir: ComboboxItemDirective<T>,
        ctx: ComboboxItemDirectiveContext<T>
    ): ctx is ComboboxItemDirectiveContext<T> {
        return true;
    }
}
