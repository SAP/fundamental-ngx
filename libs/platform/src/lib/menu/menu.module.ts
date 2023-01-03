import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PipeModule } from '@fundamental-ngx/cdk/utils';

import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        BidiModule,
        ScrollingModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    declarations: [MenuComponent, MenuItemComponent, MenuTriggerDirective],
    exports: [
        MenuComponent,
        MenuItemComponent,
        MenuTriggerDirective,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ]
})
export class PlatformMenuModule {}
