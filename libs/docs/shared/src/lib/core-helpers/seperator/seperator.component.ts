import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'separator',
    template: ``,
    styles: [
        `
            :host {
                display: block;
                margin-top: 2rem;
                border-bottom: 1px solid #e3e3e3;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeparatorComponent {}
