import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CLASS_NAME } from '../constants';

@Component({
    selector: 'fd-card-numeric-container',
    templateUrl: './card-numeric-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: CLASS_NAME.cardNumericContainer
    }
})
export class CardNumericContainerComponent {}
