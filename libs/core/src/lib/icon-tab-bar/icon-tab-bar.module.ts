import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconTabBarComponent } from './icon-tab-bar.component';



@NgModule({
  declarations: [IconTabBarComponent],
  imports: [
    CommonModule
  ],
    exports: [
        CommonModule
    ],
})
export class IconTabBarModule { }
