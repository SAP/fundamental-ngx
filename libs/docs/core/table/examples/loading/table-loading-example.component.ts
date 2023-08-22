import { Component } from '@angular/core';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { NgIf } from '@angular/common';
import { TableModule } from '@fundamental-ngx/core/table';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-table-loading-example',
    templateUrl: './table-loading-example.component.html',
    standalone: true,
    imports: [ButtonModule, FocusableGridDirective, TableModule, NgIf, RepeatDirective, SkeletonModule]
})
export class TableLoadingExampleComponent {
    loading = true;
}
