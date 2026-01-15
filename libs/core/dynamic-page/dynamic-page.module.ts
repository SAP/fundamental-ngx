import { NgModule } from '@angular/core';

import { DynamicPageHeaderSubtitleDirective } from './directives/dynamic-page-header-subtitle.directive';
import { DynamicPageHeaderTitleDirective } from './directives/dynamic-page-header-title.directive';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageGlobalActionsComponent } from './dynamic-page-header/actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from './dynamic-page-header/actions/dynamic-page-layout-actions.component';
import { DynamicPageTitleContentComponent } from './dynamic-page-header/actions/dynamic-page-title-content.component';
import { DynamicPageBreadcrumbComponent } from './dynamic-page-header/breadcrumb/dynamic-page-breadcrumb.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageSubheaderComponent } from './dynamic-page-header/subheader/dynamic-page-subheader.component';
import { DynamicPageWrapperDirective } from './dynamic-page-wrapper.directive';
import { DynamicPageComponent } from './dynamic-page.component';

const components = [
    DynamicPageComponent,
    DynamicPageHeaderComponent,
    DynamicPageGlobalActionsComponent,
    DynamicPageLayoutActionsComponent,
    DynamicPageSubheaderComponent,
    DynamicPageContentComponent,
    DynamicPageFooterComponent,
    DynamicPageTitleContentComponent,
    DynamicPageWrapperDirective,
    DynamicPageHeaderSubtitleDirective,
    DynamicPageHeaderTitleDirective,
    DynamicPageBreadcrumbComponent
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class DynamicPageModule {}
