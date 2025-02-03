import { Component } from '@angular/core';
import { FocusableGridDirective, RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-table-loading-example',
    templateUrl: './table-loading-example.component.html',
    imports: [ButtonComponent, FocusableGridDirective, TableModule, RepeatDirective, SkeletonModule]
})
export class TableLoadingExampleComponent {
    loading = true;
}
