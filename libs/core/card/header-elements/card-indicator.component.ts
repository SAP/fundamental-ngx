import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-card-indicator',
    template: `<ng-content select="[fd-card-indicator-title]"></ng-content>
        <ng-content select="[fd-card-indicator-value]"></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-card__indicator'
    }
})
export class CardIndicatorComponent {}
