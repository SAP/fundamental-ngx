import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-card-object-example',
    templateUrl: 'card-object-example.component.html',
    styleUrls: ['./card-object-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardObjectExampleComponent {}
