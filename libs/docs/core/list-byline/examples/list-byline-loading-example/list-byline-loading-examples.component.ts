import { Component } from '@angular/core';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { IconModule } from '@fundamental-ngx/core/icon';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { NgIf } from '@angular/common';
import { ListModule } from '@fundamental-ngx/core/list';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-list-byline-loading-example',
    templateUrl: './list-byline-loading-example.component.html',
    standalone: true,
    imports: [ButtonModule, ListModule, NgIf, RepeatDirective, IconModule, SkeletonModule]
})
export class ListBylineLoadingExampleComponent {
    loading = true;
}
