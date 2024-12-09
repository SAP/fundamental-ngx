import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { CardModule } from '@fundamental-ngx/core/card';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-card-table-example',
    templateUrl: './card-table-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, FocusableGridDirective, TableModule, ObjectStatusComponent]
})
export class CardTableExampleComponent {}
