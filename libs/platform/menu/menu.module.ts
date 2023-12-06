import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent } from './menu.component';

const components = [MenuComponent, MenuItemComponent, MenuTriggerDirective, ContentDensityModule];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformMenuModule {}
