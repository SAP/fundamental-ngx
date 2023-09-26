import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { StandardListItemComponent } from './standard-list-item.component';

@NgModule({
    imports: [StandardListItemComponent, ContentDensityModule],
    exports: [StandardListItemComponent, ContentDensityModule]
})
export class StandardListItemModule {}
