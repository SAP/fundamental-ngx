import { NgModule } from '@angular/core';

import { DynamicPageHeaderSubtitleDirective } from './directives/dynamic-page-header-subtitle.directive';
import { DynamicPageHeaderTitleDirective } from './directives/dynamic-page-header-title.directive';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageGlobalActionsComponent } from './dynamic-page-header/actions/global-actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from './dynamic-page-header/actions/layout-actions/dynamic-page-layout-actions.component';
import { DynamicPageBreadcrumbComponent } from './dynamic-page-header/breadcrumb/dynamic-page-breadcrumb.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageKeyInfoComponent } from './dynamic-page-header/key-info/dynamic-page-key-info.component';
import { DynamicPageTitleImageComponent } from './dynamic-page-header/title/dynamic-page-title-image.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageComponent } from './dynamic-page.component';

const components = [
    DynamicPageComponent,
    DynamicPageTitleComponent,
    DynamicPageKeyInfoComponent,
    DynamicPageBreadcrumbComponent,
    DynamicPageGlobalActionsComponent,
    DynamicPageLayoutActionsComponent,
    DynamicPageHeaderComponent,
    DynamicPageContentComponent,
    DynamicPageFooterComponent,
    DynamicPageTitleImageComponent,
    DynamicPageHeaderSubtitleDirective,
    DynamicPageHeaderTitleDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformDynamicPageModule {}
