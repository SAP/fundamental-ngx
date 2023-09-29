import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ObjectListItemRowComponent } from './object-list-item-row.component';
import { ObjectListItemComponent } from './object-list-item.component';

@NgModule({
    imports: [ObjectListItemComponent, ObjectListItemRowComponent, ContentDensityModule],
    exports: [ObjectListItemComponent, ObjectListItemRowComponent, ContentDensityModule]
})
export class ObjectListItemModule {}
