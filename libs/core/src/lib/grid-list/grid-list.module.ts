import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ObjectStatusModule } from '../object-status/object-status.module';
import { ButtonModule } from '../button/button.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

import { GridListComponent } from './components/grid-list/grid-list.component';
import { GridListFilterBarComponent } from './components/grid-list-filter-bar/grid-list-filter-bar.component';
import { GridListFooterComponent } from './components/grid-list-footer/grid-list-footer.component';
import { GridListGroupHeaderComponent } from './components/grid-list-group-header/grid-list-group-header.component';
import { GridListItemComponent } from './components/grid-list-item/grid-list-item.component';
import { GridListItemFooterBarComponent } from './components/grid-list-item-footer-bar/grid-list-item-footer-bar.component';
import { GridListItemToolbarComponent } from './components/grid-list-item-toolbar/grid-list-item-toolbar.component';
import { GridListMoreBtnComponent } from './components/grid-list-more-btn/grid-list-more-btn.component';
import { GridListTitleBarComponent } from './components/grid-list-title-bar/grid-list-title-bar.component';
import { GridListTitleBarAdditionalTitleItemDirective } from './components/grid-list-title-bar/grid-list-title-bar.directive';
import { GridListTitleBarSpacerComponent } from './components/grid-list-title-bar-spacer/grid-list-title-bar-spacer.component';

@NgModule({
    declarations: [
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
        GridListTitleBarAdditionalTitleItemDirective
    ],
    imports: [CommonModule, ButtonModule, ToolbarModule, ObjectStatusModule, FormsModule],
    exports: [
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
        GridListTitleBarAdditionalTitleItemDirective
    ]
})
export class GridListModule {}
