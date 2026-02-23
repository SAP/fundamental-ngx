import { Component } from '@angular/core';
import { range } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-list-loading-example',
    templateUrl: './list-loading-example.component.html',
    imports: [ButtonComponent, ListModule, SkeletonComponent]
})
export class ListLoadingExampleComponent {
    loading = true;
    readonly loadingRange = range(3);
}
