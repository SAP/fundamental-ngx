import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-shellbar-separator',
    template: `<span class="fd-shellbar__separator"></span>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    styles: [
        `
            :host {
                display: flex;
            }
        `
    ]
})
export class ShellbarSeparatorComponent {}
