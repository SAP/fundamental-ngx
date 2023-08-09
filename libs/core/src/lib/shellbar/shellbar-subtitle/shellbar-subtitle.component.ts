import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a shellbar subtitle.
 * The subtitle is optional and should be used rarely.
 * ```html
 *   <fd-shellbar-subtitle>
 *      Corporate Portal
 *   </fd-shellbar-subtitle>
 * ```
 */
@Component({
    selector: 'fd-shellbar-subtitle',
    templateUrl: './shellbar-subtitle.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            fd-shellbar-subtitle {
                display: flex;
            }
        `
    ],
    standalone: true
})
export class ShellbarSubtitleComponent {}
