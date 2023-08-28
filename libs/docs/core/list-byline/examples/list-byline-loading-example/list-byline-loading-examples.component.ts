import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-list-byline-loading-example',
    templateUrl: './list-byline-loading-example.component.html',
    standalone: true,
    imports: [ButtonModule, ListModule, NgIf, RepeatDirective, IconModule, SkeletonModule]
})
export class ListBylineLoadingExampleComponent {
    loading = true;
}
