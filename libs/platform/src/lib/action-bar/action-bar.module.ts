import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ActionBarComponent } from './action-bar.component';

@NgModule({
    imports: [ActionBarComponent, ContentDensityModule],
    exports: [ActionBarComponent, ContentDensityModule]
})
export class PlatformActionBarModule {}
