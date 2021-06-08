import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-card-example',
    templateUrl: './card-example.component.html',
    styleUrls: ['./card-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardExampleComponent {}
