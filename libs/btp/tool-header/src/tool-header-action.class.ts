import { Directive, Input, TemplateRef, booleanAttribute } from '@angular/core';

@Directive()
export class ToolHeaderActionClass<ActionTemplateContext = any> {
    /** Whether the element is forced to be visible. */
    @Input({ transform: booleanAttribute })
    forceVisibility: boolean;

    /** Template of the action section */
    templateRef: TemplateRef<ActionTemplateContext>;

    /** @hidden */
    readonly isSeparator: boolean;
}
