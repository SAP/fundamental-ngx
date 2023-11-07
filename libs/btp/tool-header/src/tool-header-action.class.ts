import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, TemplateRef } from '@angular/core';

@Directive()
export class ToolHeaderActionClass<ActionTemplateContext = any> {
    /** Whether the element is forced to be visible. */
    @Input({ transform: coerceBooleanProperty })
    forceVisibility: boolean;

    /** Template of the action section */
    templateRef: TemplateRef<ActionTemplateContext>;

    /** @hidden */
    readonly isSeparator: boolean;
}
