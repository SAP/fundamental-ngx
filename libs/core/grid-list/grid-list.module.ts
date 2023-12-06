import { NgModule } from '@angular/core';

import { GridListFilterBarComponent } from './components/grid-list-filter-bar/grid-list-filter-bar.component';
import { GridListFooterComponent } from './components/grid-list-footer/grid-list-footer.component';
import { GridListGroupHeaderComponent } from './components/grid-list-group-header/grid-list-group-header.component';
import { GridListItemFooterBarComponent } from './components/grid-list-item-footer-bar/grid-list-item-footer-bar.component';
import { GridListItemToolbarComponent } from './components/grid-list-item-toolbar/grid-list-item-toolbar.component';
import { GridListItemComponent } from './components/grid-list-item/grid-list-item.component';
import { GridListMoreBtnComponent } from './components/grid-list-more-btn/grid-list-more-btn.component';
import { GridListTitleBarSpacerComponent } from './components/grid-list-title-bar-spacer/grid-list-title-bar-spacer.component';
import { GridListTitleBarComponent } from './components/grid-list-title-bar/grid-list-title-bar.component';
import { GridListTitleBarAdditionalTitleItemDirective } from './components/grid-list-title-bar/grid-list-title-bar.directive';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { GridListItemBodyDirective } from './directives/grid-list-item-body.directive';
import { GridListItemImageDirective } from './directives/grid-list-item-image.directive';

const components = [
    GridListComponent,
    GridListItemComponent,
    GridListTitleBarComponent,
    GridListFilterBarComponent,
    GridListMoreBtnComponent,
    GridListFooterComponent,
    GridListItemFooterBarComponent,
    GridListItemToolbarComponent,
    GridListGroupHeaderComponent,
    GridListTitleBarSpacerComponent,
    GridListTitleBarAdditionalTitleItemDirective,
    GridListItemImageDirective,
    GridListItemBodyDirective
];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class GridListModule {}
