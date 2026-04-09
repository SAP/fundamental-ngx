import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'separator',
    template: ``,
    styles: [
        `
            :host {
                display: block;
                margin-block-start: 1.5rem;
                border: none;
                height: 0;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeparatorComponent {}
