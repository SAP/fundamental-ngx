import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-card-loading-example',
    templateUrl: './card-loading-example.component.html',
    styleUrls: ['./card-loading-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, SkeletonModule, ListModule, RepeatDirective]
})
export class CardLoadingExampleComponent {}
