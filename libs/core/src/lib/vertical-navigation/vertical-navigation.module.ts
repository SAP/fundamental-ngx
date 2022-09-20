import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { RepeatModule } from '@fundamental-ngx/core/utils';

import { VerticalNavigationComponent } from './vertical-navigation.component';
import { VerticalNavigationMainNavigationComponent } from './vertical-navigation-main-navigation.component';
import { VerticalNavigationGroupHeaderDirective } from './vertical-navigation-group-header.directive';

@NgModule({
    declarations: [
        VerticalNavigationComponent,
        VerticalNavigationMainNavigationComponent,
        VerticalNavigationGroupHeaderDirective
    ],
    imports: [CommonModule, ListModule, SkeletonModule, RepeatModule],
    exports: [
        VerticalNavigationComponent,
        VerticalNavigationMainNavigationComponent,
        VerticalNavigationGroupHeaderDirective
    ]
})
export class VerticalNavigationModule {}
