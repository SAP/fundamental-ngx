import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * The shellbar separator component.
 */
@Component({
    selector: 'fd-shellbar-separator',
    template: ``,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    styles: [
        `
            :host {
                display: flex;
            }
        `
    ],
    host: {
        class: 'fd-shellbar__separator'
    }
})
export class ShellbarSeparatorComponent {}
