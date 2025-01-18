import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-shellbar-spacer',
    template: `<span class="fd-shellbar__spacer"></span>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    styles: [
        `
            :host {
                display: flex;
                flex: 1;
            }
        `
    ]
})
export class ShellbarSpacerComponent {}
