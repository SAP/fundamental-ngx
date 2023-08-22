import { Component } from '@angular/core';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { NgIf } from '@angular/common';
import { ListModule } from '@fundamental-ngx/core/list';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-list-loading-example',
    templateUrl: './list-loading-example.component.html',
    standalone: true,
    imports: [ButtonModule, ListModule, NgIf, RepeatDirective, SkeletonModule]
})
export class ListLoadingExampleComponent {
    loading = true;
}
