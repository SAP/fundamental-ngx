import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-card-loading-example',
    templateUrl: './card-loading-example.component.html',
    styleUrls: ['./card-loading-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardLoadingExampleComponent {}
