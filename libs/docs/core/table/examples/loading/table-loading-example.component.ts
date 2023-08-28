import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FocusableGridDirective, RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-table-loading-example',
    templateUrl: './table-loading-example.component.html',
    standalone: true,
    imports: [ButtonModule, FocusableGridDirective, TableModule, NgIf, RepeatDirective, SkeletonModule]
})
export class TableLoadingExampleComponent {
    loading = true;
}
