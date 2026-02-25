import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-list-byline-loading-example',
    templateUrl: './list-byline-loading-example.component.html',
    imports: [ButtonComponent, ListModule, IconComponent, SkeletonComponent]
})
export class ListBylineLoadingExampleComponent {
    loading = true;
}
