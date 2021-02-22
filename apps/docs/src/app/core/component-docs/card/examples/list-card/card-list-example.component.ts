import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-card-list-example',
    templateUrl: 'card-list-example.component.html',
    styleUrls: ['./card-list-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListExampleComponent {}
