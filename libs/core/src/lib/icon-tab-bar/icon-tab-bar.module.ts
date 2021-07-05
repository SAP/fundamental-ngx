import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconTabBarComponent } from './icon-tab-bar.component';
import { IconModule } from '@fundamental-ngx/core';



@NgModule({
    declarations: [
        IconTabBarComponent,
    ],
    imports: [
        CommonModule,
        IconModule,
    ],
    exports: [
        CommonModule,
        IconTabBarComponent,
    ]
})
export class IconTabBarModule {
}
