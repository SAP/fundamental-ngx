import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-card-loader-example',
    templateUrl: './card-loader-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardLoaderExampleComponent {}
