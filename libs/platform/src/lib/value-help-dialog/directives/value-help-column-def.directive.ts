import { Directive, Input, TemplateRef, inject } from '@angular/core';

export interface ValueHelpColumnDefContext<T> {
    $implicit: T;
    key: string;
    value: any;
}

@Directive({
    selector: '[fdpValueHelpColumnDef]',
    standalone: true
})
export class ValueHelpColumnDefDirective<T = any> {
    /** Type support. */
    @Input('fdpValueHelpColumnDefAs')
    as: T;

    /** Column key to render custom template. */
    @Input('fdpValueHelpColumnDefColumn')
    column: string;
    /** Template reference */
    readonly templateRef = inject<TemplateRef<ValueHelpColumnDefContext<T>>>(TemplateRef);
}
