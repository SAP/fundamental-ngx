import { Directive, TemplateRef } from '@angular/core';

/**
 * Directive used to change dirty label of Variant Management component.
 *
 * Usage:
 *
 * ```
 * html
 * <fdp-variant-management>
 *     <span *fdpVariantManagementDirtyLabel>I'm dirty</span>
 * </fdp-variant-management>
 * ```
 */
@Directive({
    selector: '[fdpVariantManagementDirtyLabel]'
})
export class VariantManagementDirtyLabelDirective {
    /** @hidden */
    constructor(public templateRef: TemplateRef<any>) {}
}
