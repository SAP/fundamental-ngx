import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FD_SHELLBAR_TITLE_COMPONENT } from '../tokens';

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
    template: `
        <span class="fd-shellbar__title">
            <ng-content></ng-content>
        </span>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    styles: [
        `
            fd-shellbar-title {
                display: flex;
            }
        `
    ],
    providers: [
        {
            provide: FD_SHELLBAR_TITLE_COMPONENT,
            useExisting: ShellbarTitleComponent
        }
    ]
})
export class ShellbarTitleComponent {}
