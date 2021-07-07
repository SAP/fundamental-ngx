import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconTabBarComponent } from './icon-tab-bar.component';
import { IconModule, PopoverModule } from '@fundamental-ngx/core';
import { IconTabBarTextTypeComponent } from './components/icon-tab-bar-text-type/icon-tab-bar-text-type.component';
import { OverflowItemsModule } from '../utils/directives/overflow-items/overflow-items.module';



@NgModule({
    declarations: [
        IconTabBarComponent,
        IconTabBarTextTypeComponent,
    ],
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        OverflowItemsModule,
    ],
    exports: [
        CommonModule,
        IconTabBarComponent,
    ]
})
export class IconTabBarModule {
}
