import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'separator',
    template: ``,
    styles: [
        `
            :host {
                display: block;
                margin-top: 2rem;
                border-bottom: 1px solid var(--sapList_BorderColor);
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeparatorComponent {}
