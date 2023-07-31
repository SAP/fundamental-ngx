import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'description',
    template: `
        <p class="description">
            <ng-content></ng-content>
        </p>
    `,
    styles: [
        `
            .description {
                color: var(--sapTextColor);
                font-weight: 300;
                font-size: 1rem;
                margin-bottom: 1.5rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionComponent {}
