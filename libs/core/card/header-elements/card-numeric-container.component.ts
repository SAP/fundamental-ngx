import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-card-numeric-container',
    templateUrl: './card-numeric-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-card__numeric-container'
    }
})
export class CardNumericContainerComponent {}
