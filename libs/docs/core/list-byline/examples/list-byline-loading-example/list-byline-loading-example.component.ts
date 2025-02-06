import { Component } from '@angular/core';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-list-byline-loading-example',
    templateUrl: './list-byline-loading-example.component.html',
    imports: [ButtonComponent, ListModule, RepeatDirective, IconComponent, SkeletonModule]
})
export class ListBylineLoadingExampleComponent {
    loading = true;
}
