import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { TableModule } from '@fundamental-ngx/core/table';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-card-table-example',
    templateUrl: './card-table-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CardModule, FocusableGridDirective, TableModule, ObjectStatusModule]
})
export class CardTableExampleComponent {}
