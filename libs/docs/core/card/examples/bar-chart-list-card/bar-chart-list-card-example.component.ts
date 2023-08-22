import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardBarComponent } from './card-bar.component';
import { ListModule } from '@fundamental-ngx/core/list';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-bar-chart-list-card-example',
    templateUrl: './bar-chart-list-card-example.component.html',
    styleUrls: ['./bar-chart-list-card-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CardModule, ListModule, CardBarComponent]
})
export class BarChartListCardExampleComponent {}
