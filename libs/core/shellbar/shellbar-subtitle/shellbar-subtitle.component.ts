import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FD_SHELLBAR_SUBTITLE_COMPONENT } from '../tokens';

/**
 * @deprecated
 * This component has been deprecated as of 0.54.2. A shellbar subtitle should no longer be provided.
 *
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
    template: `
        <span class="fd-shellbar__subtitle">
            <ng-content></ng-content>
        </span>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    styles: [
        `
            fd-shellbar-subtitle {
                display: flex;
            }
        `
    ],
    providers: [
        {
            provide: FD_SHELLBAR_SUBTITLE_COMPONENT,
            useExisting: ShellbarSubtitleComponent
        }
    ]
})
export class ShellbarSubtitleComponent {}
