import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemPageComponent} from './item-page.component';
import {RouterModule} from '@angular/router';
import {BreadcrumbModule, ButtonModule, StepInputModule} from '@fundamental-ngx/core';
import {ItemPageRoutingModule} from './item-page-routing.module';
import { TabsModule } from '@fundamental-ngx/core';


@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule,
    ItemPageRoutingModule,
    ButtonModule,
    TabsModule,
    StepInputModule
  ],
  declarations: [ItemPageComponent],
  exports: [
    RouterModule
  ],
})
export class ItemPageModule {
}
