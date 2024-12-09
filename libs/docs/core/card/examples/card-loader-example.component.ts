import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-card-loader-example',
    templateUrl: './card-loader-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, BusyIndicatorComponent]
})
export class CardLoaderExampleComponent {}
