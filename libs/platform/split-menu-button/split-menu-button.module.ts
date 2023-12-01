import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { SplitMenuButtonComponent } from './split-menu-button.component';

@NgModule({
    imports: [SplitMenuButtonComponent, ContentDensityModule],
    exports: [SplitMenuButtonComponent, ContentDensityModule]
})
export class PlatformSplitMenuButtonModule {}
