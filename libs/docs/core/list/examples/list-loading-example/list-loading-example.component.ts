import { Component } from '@angular/core';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-list-loading-example',
    templateUrl: './list-loading-example.component.html',
    imports: [ButtonComponent, ListModule, RepeatDirective, SkeletonModule]
})
export class ListLoadingExampleComponent {
    loading = true;
}
