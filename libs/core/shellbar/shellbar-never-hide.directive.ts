import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Directive to prevent a shellbar context area item from being hidden during resize.
 * Elements with this directive will remain visible even if the shellbar overflows.
 *
 * @example
 * ```html
 * <fd-shellbar-context-area>
 *   <button fdShellbarNeverHide>Always Visible</button>
 *   <button [fdShellbarHidePriority]="2">Can be hidden</button>
 * </fd-shellbar-context-area>
 * ```
 */
@Directive({
    selector: '[fdShellbarNeverHide]',
    standalone: true,
    host: {
        '[style.flex-shrink]': '0',
        class: 'fd-shellbar-never-hide'
    }
})
export class ShellbarNeverHideDirective {
    /** @hidden */
    readonly elRef = inject(ElementRef);
}
