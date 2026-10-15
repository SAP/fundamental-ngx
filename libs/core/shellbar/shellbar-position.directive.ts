import { Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Directive to specify the position of an item within a shellbar context area.
 * Items default to the left position (after branding) unless explicitly positioned right.
 *
 * @example
 * ```html
 * <fd-shellbar-context-area>
 *     <!-- Defaults to left, no directive needed -->
 *     <span>Left item</span>
 *     <!-- Explicitly positioned right -->
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
