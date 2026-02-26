import { Component } from '@angular/core';
import { FocusableGridDirective, range } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-table-loading-example',
    templateUrl: './table-loading-example.component.html',
    imports: [ButtonComponent, FocusableGridDirective, TableModule, SkeletonComponent]
})
export class TableLoadingExampleComponent {
    loading = true;
    readonly loadingRange = range(3);
}
