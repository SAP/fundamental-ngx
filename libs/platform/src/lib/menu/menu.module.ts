import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';

@NgModule({
    imports: [CommonModule, OverlayModule, BidiModule, ScrollingModule],
    declarations: [MenuComponent, MenuItemComponent, MenuTriggerDirective],
    exports: [MenuComponent, MenuItemComponent, MenuTriggerDirective]
})
export class PlatformMenuModule {}
