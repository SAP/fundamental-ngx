import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalNavigationComponent } from './vertical-navigation.component';
import { VerticalNavigationMainNavigationComponent } from './vertical-navigation-main-navigation.component';
import { ListModule } from '@fundamental-ngx/core/list';
import { VerticalNavigationGroupHeaderDirective } from './vertical-navigation-group-header.directive';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [
        VerticalNavigationComponent,
        VerticalNavigationMainNavigationComponent,
        VerticalNavigationGroupHeaderDirective
    ],
    imports: [CommonModule, ListModule, I18nModule],
    exports: [
        VerticalNavigationComponent,
        VerticalNavigationMainNavigationComponent,
        VerticalNavigationGroupHeaderDirective
    ]
})
export class VerticalNavigationModule {}
