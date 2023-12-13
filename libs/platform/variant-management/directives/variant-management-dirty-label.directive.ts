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
    selector: '[fdpVariantManagementDirtyLabel]',
    standalone: true
})
export class VariantManagementDirtyLabelDirective {
    /** @ignore */
    constructor(public templateRef: TemplateRef<any>) {}
}
