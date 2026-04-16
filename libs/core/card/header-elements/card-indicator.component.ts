import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CLASS_NAME } from '../constants';

@Component({
    selector: 'fd-card-indicator',
    template: `<ng-content select="[fd-card-indicator-title]"></ng-content>
        <ng-content select="[fd-card-indicator-value]"></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: CLASS_NAME.cardIndicator
    }
})
export class CardIndicatorComponent {}
