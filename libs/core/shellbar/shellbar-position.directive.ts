import { Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Directive to specify the position of an item within a shellbar context area.
 * Items can be positioned on the left (after branding) or right (before actions).
 *
 * @example
 * ```html
 * <fd-shellbar-context-area>
 *     <span fdShellbarPosition="left">Left item</span>
 *     <span fdShellbarPosition="right">Right item</span>
 * </fd-shellbar-context-area>
 * ```
 */
@Directive({
    selector: '[fdShellbarPosition]',
    standalone: true,
    host: {
        '[attr.data-fd-shellbar-position]': 'fdShellbarPosition()'
    }
})
export class ShellbarPositionDirective {
    /**
     * Position of the item within the shellbar context area.
     * - 'left': After branding, before search (default)
     * - 'right': After search, before actions
     */
    readonly fdShellbarPosition = input<'left' | 'right'>('left');

    /** @hidden */
    readonly el = inject(ElementRef);
}
