import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalNavigationComponent } from './vertical-navigation.component';
import { VerticalNavigationMainNavigationComponent } from './vertical-navigation-main-navigation.compenent';
import { ListModule } from '@fundamental-ngx/core/list';

@NgModule({
    declarations: [VerticalNavigationComponent, VerticalNavigationMainNavigationComponent],
    imports: [CommonModule, ListModule],
    exports: [VerticalNavigationComponent, VerticalNavigationMainNavigationComponent]
})
export class VerticalNavigationModule {}
