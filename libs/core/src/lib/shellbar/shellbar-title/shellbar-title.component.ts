import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a shellbar title.
 * The title is a required element and displays the current application name.
 * ```html
 *   <fd-shellbar-title>
 *      Corporate Portal
 *   </fd-shellbar-title>
 * ```
 */
@Component({
    selector: 'fd-shellbar-title',
    templateUrl: './shellbar-title.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ShellbarTitleComponent {}
