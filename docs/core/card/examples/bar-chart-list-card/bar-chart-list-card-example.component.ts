import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';
import { CardBarComponent } from './card-bar.component';

@Component({
    selector: 'fd-bar-chart-list-card-example',
    templateUrl: './bar-chart-list-card-example.component.html',
    styleUrls: ['./bar-chart-list-card-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, ListModule, CardBarComponent]
})
export class BarChartListCardExampleComponent {}
