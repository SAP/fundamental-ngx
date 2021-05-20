import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageGlobalActionsComponent } from './dynamic-page-header/actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from './dynamic-page-header/actions/dynamic-page-layout-actions.component';
import { DynamicPageSubheaderComponent } from './dynamic-page-header/subheader/dynamic-page-subheader.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageComponent } from './dynamic-page.component';
import { ButtonModule } from '../button/button.module';
import { DynamicPageTitleContentComponent } from './dynamic-page-header/actions/dynamic-page-title-content.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { PopoverModule } from '../popover/popover.module';

@NgModule({
    declarations: [
        DynamicPageComponent,
        DynamicPageHeaderComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageSubheaderComponent,
        DynamicPageContentComponent,
        DynamicPageFooterComponent,
        DynamicPageTitleContentComponent
    ],
    imports: [CommonModule, ButtonModule, ToolbarModule, PopoverModule],
    exports: [
        DynamicPageComponent,
        DynamicPageHeaderComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageSubheaderComponent,
        DynamicPageContentComponent,
        DynamicPageFooterComponent,
        DynamicPageTitleContentComponent
    ]
})
export class DynamicPageModule {}
