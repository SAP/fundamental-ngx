import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageGlobalActionsComponent } from './dynamic-page-header/actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from './dynamic-page-header/actions/dynamic-page-layout-actions.component';
import { DynamicPageSubheaderComponent } from './dynamic-page-header/subheader/dynamic-page-subheader.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageComponent } from './dynamic-page.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DynamicPageTitleContentComponent } from './dynamic-page-header/actions/dynamic-page-title-content.component';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { DynamicPageWrapperDirective } from './dynamic-page-wrapper.directive';
import { IgnoreClickOnSelectionModule } from '@fundamental-ngx/cdk/utils';
import { DeprecatedDynamicPageCompactDirective } from './deprecated-dynamic-page-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { DynamicPageHeaderSubtitleDirective } from './directives/dynamic-page-header-subtitle.directive';
import { DynamicPageHeaderTitleDirective } from './directives/dynamic-page-header-title.directive';

@NgModule({
    declarations: [
        DynamicPageComponent,
        DynamicPageHeaderComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageSubheaderComponent,
        DynamicPageContentComponent,
        DynamicPageFooterComponent,
        DynamicPageTitleContentComponent,
        DynamicPageWrapperDirective,
        DeprecatedDynamicPageCompactDirective
    ],
    imports: [
        CommonModule,
        ButtonModule,
        ToolbarModule,
        PopoverModule,
        IgnoreClickOnSelectionModule,
        ContentDensityModule,
        ScrollbarModule,
        DynamicPageHeaderSubtitleDirective,
        DynamicPageHeaderTitleDirective
    ],
    exports: [
        DynamicPageComponent,
        DynamicPageHeaderComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageSubheaderComponent,
        DynamicPageContentComponent,
        DynamicPageFooterComponent,
        DynamicPageTitleContentComponent,
        DynamicPageWrapperDirective,
        DeprecatedDynamicPageCompactDirective,
        DynamicPageHeaderSubtitleDirective,
        DynamicPageHeaderTitleDirective
    ]
})
export class DynamicPageModule {}
