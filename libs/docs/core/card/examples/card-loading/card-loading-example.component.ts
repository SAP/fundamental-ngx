import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-card-loading-example',
    templateUrl: './card-loading-example.component.html',
    styleUrls: ['./card-loading-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, SkeletonComponent, ListModule]
})
export class CardLoadingExampleComponent {}
