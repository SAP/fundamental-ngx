import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalNavigationComponent } from './vertical-navigation.component';
import { VerticalNavigationMainNavigationComponent } from './vertical-navigation-main-navigation.component';
import { ListModule } from '@fundamental-ngx/core/list';
import { VerticalNavigationGroupHeaderDirective } from './vertical-navigation-group-header.directive';

@NgModule({
    declarations: [
        VerticalNavigationComponent,
        VerticalNavigationMainNavigationComponent,
        VerticalNavigationGroupHeaderDirective
    ],
    imports: [CommonModule, ListModule],
    exports: [
        VerticalNavigationComponent,
        VerticalNavigationMainNavigationComponent,
        VerticalNavigationGroupHeaderDirective
    ]
})
export class VerticalNavigationModule {}
