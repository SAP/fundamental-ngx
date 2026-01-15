import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { ActionListItemModule } from './action-list-item/action-list-item.module';
import { ListItemDef } from './base-list-item';
import { DisplayListItemModule } from './display-list-item/display-list-item.module';
import { FreeContentListItemComponent } from './free-content-list-item/free-content-list-item.component';
import { ListFooterComponent } from './list-group-footer.component';
import { ListGroupHeaderComponent } from './list-group-header.component';
import { ListComponent } from './list.component';
import { LoadMoreContentDirective } from './load-more-content.directive';
import { ObjectListItemModule } from './object-list-item/object-list-item.module';
import { StandardListItemModule } from './standard-list-item/standard-list-item.module';

const components = [
    ListComponent,
    ListFooterComponent,
    ListGroupHeaderComponent,
    ListItemDef,
    ContentDensityModule,
    StandardListItemModule,
    ObjectListItemModule,
    DisplayListItemModule,
    ActionListItemModule,
    FreeContentListItemComponent,
    LoadMoreContentDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformListModule {}
