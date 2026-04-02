import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'separator',
    template: ``,
    styles: [
        `
            :host {
                display: block;
                margin: 2.5rem 0 0.5rem;
                border: none;
                height: 0.0625rem;
                background: linear-gradient(to right, transparent, var(--sapGroup_ContentBorderColor), transparent);
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeparatorComponent {}
