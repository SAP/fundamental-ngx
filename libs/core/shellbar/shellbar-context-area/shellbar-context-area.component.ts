import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * The component for shellbar context area.
 */
@Component({
    selector: 'fd-shellbar-context-area',
    template: ` <div class="fd-shellbar__group fd-shellbar__group--context-area">
        <div class="fd-shellbar__group--context-area-content-container">
            <ng-content></ng-content>
        </div>
    </div>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ShellbarContextAreaComponent {}
