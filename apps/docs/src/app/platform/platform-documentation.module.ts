import { NgModule } from '@angular/core';
import { SharedDocumentationModule } from '../documentation/shared-documentation.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from './platform-documentation.routes';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { MarkdownModule } from 'ngx-markdown';
import { PlatformButtonDocsComponent } from '../platform/component-docs/platform-button/platform-button-docs.component';
import { PlatformButtonHeaderComponent } from '../platform/component-docs/platform-button/platform-button-header/platform-button-header.component';
import { NewComponentComponent } from '../platform/component-docs/new-component/new-component.component';
import {
    PlatformButtonIconsExampleComponent,
    PlatformButtonSizesExampleComponent,
    PlatformButtonStateExampleComponent,
    PlatformButtonTypesExampleComponent,
    PlatformButtonTruncateExampleComponent
} from '../platform/component-docs/platform-button/platform-button-examples/platform-button-examples.component';
import { PlatformActionBarExamplesComponent } from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-simple-example.component';
import { PlatformActionBarWithBackButtonExampleComponent } from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-with-back-button-example.component';
import { PlatformActionBarWithDescriptionExampleComponent } from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-with-description-example.component';
import { PlatformActionBarWithLongPageTitleExampleComponent } from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-with-long-title-example.component';
import { PlatformActionBarWithContextualMenuExampleComponent } from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-contextual-menu-example.component';
import { PlatformActionBarWithPositiveNegativeActionsExampleComponent } from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component';
import { PlatformActionBarHeaderComponent } from '../platform/component-docs/platform-action-bar/platform-action-bar-header/platform-action-bar-header.component';
import { PlatformActionBarDocsComponent } from '../platform/component-docs/platform-action-bar/platform-action-bar-docs.component';
import { SchemaModule } from '../schema/schema.module';
import { PLATFORM_COMPONENT_SCHEMAS } from './component-docs/schemas';

import {
    PlatformLinkStandardExampleComponent,
    PlatformLinkEmphasizedExampleComponent,
    PlatformLinkDisabledExampleComponent,
    PlatformLinkDisabledEmphasizedExampleComponent,
    PlatformLinkInvertedExampleComponent,
    PlatformLinkTruncatedExampleComponent,
    PlatformLinkIconExampleComponent
} from './component-docs/platform-link/platform-link-examples/platform-link-examples.component';
import { PlatformLinkHeaderComponent } from './component-docs/platform-link/platform-link-header/platform-link-header.component';
import { PlatformLinkDocsComponent } from './component-docs/platform-link/platform-link-docs.component';

import { PlatformMenuDocsComponent } from './component-docs/platform-menu/platform-menu-docs.component';
import { PlatformMenuHeaderComponent } from './component-docs/platform-menu/platform-menu-header/platform-menu-header.component';
import { PlatformMenuBasicExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-basic-example.component';
import { PlatformMenuXPositionExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-x-position-example.component';
import { PlatformMenuCascadeExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-cascade-example.component';
import { PlatformMenuScrollingExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-scrolling-example.component';

import { PlatformSearchFieldDocsComponent } from './component-docs/platform-search-field/platform-search-field-docs.component';
import { PlatformSearchFieldHeaderComponent } from './component-docs/platform-search-field/platform-search-field-header/platform-search-field-header.component';
import { PlatformSearchFieldBasicExampleComponent } from './component-docs/platform-search-field/platform-search-field-examples/platform-search-field-basic-example.component';
import { PlatformSearchFieldCategoriesExampleComponent } from './component-docs/platform-search-field/platform-search-field-examples/platform-search-field-categories-example.component';
import { PlatformSearchFieldDataSourceExampleComponent } from './component-docs/platform-search-field/platform-search-field-examples/platform-search-field-data-source-example.component';
import { PlatformRadioGroupHeaderComponent } from './component-docs/platform-forms/radio-group/platform-radio-group-header/platform-radio-group-header.component';
import { PlatformRadioGroupListItemsExampleComponent } from './component-docs/platform-forms/radio-group/platform-radio-group-examples/platform-radio-group-list-items-examples.component';
import { PlatformRadioGroupListExampleComponent } from './component-docs/platform-forms/radio-group/platform-radio-group-examples/platform-radio-group-list-examples.component';
import { PlatformRadioGroupDocsComponent } from './component-docs/platform-forms/radio-group/platform-radio-group-docs.component';
import { PlatformRadioGroupContentExampleComponent } from './component-docs/platform-forms/radio-group/platform-radio-group-examples/platform-radio-group-content-examples.component';
import { PlatformRadioGroupDisabledExampleComponent } from './component-docs/platform-forms/radio-group/platform-radio-group-examples/platform-radio-group-disabled-examples.component';

import { PlatformMenuButtonHeaderComponent } from './component-docs/platform-menu-button/platform-menu-button-header/platform-menu-button-header.component';
import {
    PlatformMenuButtonExampleComponent
} from './component-docs/platform-menu-button/platform-menu-button-examples/platform-menu-button-examples.component';
import { PlatformMenuButtonCozyExampleComponent } from './component-docs/platform-menu-button/platform-menu-button-examples/platform-menu-button-cozy-examples.component';
import { PlatformMenuButtonCompactExampleComponent } from './component-docs/platform-menu-button/platform-menu-button-examples/platform-menu-button-compact-examples.component';
import { PlatformMenuButtonDocsComponent } from './component-docs/platform-menu-button/platform-menu-button-docs.component';

import { PlatformSelectDocsComponent } from './component-docs/platform-select/platform-select-docs.component';
import { PlatformSelectHeaderComponent } from './component-docs/platform-select/platform-select-header/platform-select-header.component';
import { PlatformSelectTypesDefaultExampleComponent } from './component-docs/platform-select/platform-select-examples/platform-select-types-default-example.component';
import { PlatformSelectTypesNoBorderExampleComponent } from './component-docs/platform-select/platform-select-examples/platform-select-types-noborder-example.component';
import { PlatformSelectTypesSplitExampleComponent } from './component-docs/platform-select/platform-select-examples/platform-select-types-split-example.component';
import { PlatformSelectTypesWithIconExampleComponent } from './component-docs/platform-select/platform-select-examples/platform-select-types-with-icon-example.component';
import { PlatformDocsSplitMenuButtonExampleComponent } from './component-docs/platform-split-menu-button/platform-split-menu-button-examples/platform-split-menu-button-examples.component';
import { PlatformDocsSplitMenuButtonOptionsComponent } from './component-docs/platform-split-menu-button/platform-split-menu-button-examples/platform-split-menu-button-options.component';
import { PlatformDocsSplitMenuButtonHeaderComponent } from './component-docs/platform-split-menu-button/platform-split-menu-button-header/platform-split-menu-button-header.component';
import { PlatformDocsSplitMenuButtonComponent } from './component-docs/platform-split-menu-button/platform-split-menu-button.component';

import { StackblitzService } from '../documentation/core-helpers/stackblitz/stackblitz.service';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    declarations: [
        PlatformDocumentationComponent,
        PlatformHomeComponent,
        PlatformButtonDocsComponent,
        PlatformButtonIconsExampleComponent,
        PlatformButtonSizesExampleComponent,
        PlatformButtonTypesExampleComponent,
        PlatformButtonStateExampleComponent,
        PlatformButtonHeaderComponent,
        PlatformButtonTruncateExampleComponent,
        PlatformActionBarDocsComponent,
        PlatformActionBarHeaderComponent,
        PlatformActionBarExamplesComponent,
        PlatformActionBarWithBackButtonExampleComponent,
        PlatformActionBarWithDescriptionExampleComponent,
        PlatformActionBarWithLongPageTitleExampleComponent,
        PlatformActionBarWithContextualMenuExampleComponent,
        PlatformActionBarWithPositiveNegativeActionsExampleComponent,
        PlatformLinkStandardExampleComponent,
        PlatformLinkEmphasizedExampleComponent,
        PlatformLinkDisabledExampleComponent,
        PlatformLinkDisabledEmphasizedExampleComponent,
        PlatformLinkInvertedExampleComponent,
        PlatformLinkTruncatedExampleComponent,
        PlatformLinkIconExampleComponent,
        PlatformLinkHeaderComponent,
        PlatformLinkDocsComponent,
        PlatformMenuDocsComponent,
        PlatformMenuHeaderComponent,
        PlatformMenuBasicExampleComponent,
        PlatformMenuXPositionExampleComponent,
        PlatformMenuCascadeExampleComponent,
        PlatformMenuScrollingExampleComponent,
        NewComponentComponent,
        PlatformSearchFieldDocsComponent,
        PlatformSearchFieldHeaderComponent,
        PlatformSearchFieldBasicExampleComponent,
        PlatformSearchFieldCategoriesExampleComponent,
        PlatformSearchFieldDataSourceExampleComponent,
        PlatformSelectDocsComponent,
        PlatformSelectHeaderComponent,
        PlatformSelectTypesDefaultExampleComponent,
        PlatformSelectTypesNoBorderExampleComponent,
        PlatformSelectTypesSplitExampleComponent,
        PlatformSelectTypesWithIconExampleComponent,
        PlatformDocsSplitMenuButtonExampleComponent,
        PlatformDocsSplitMenuButtonOptionsComponent,
        PlatformDocsSplitMenuButtonHeaderComponent,
        PlatformDocsSplitMenuButtonComponent,
        PlatformRadioGroupHeaderComponent,
        PlatformRadioGroupListItemsExampleComponent,
        PlatformRadioGroupListExampleComponent,
        PlatformRadioGroupContentExampleComponent,
        PlatformRadioGroupDisabledExampleComponent,
        PlatformRadioGroupDocsComponent,
        PlatformMenuButtonDocsComponent,
        PlatformMenuButtonExampleComponent,
        PlatformMenuButtonCozyExampleComponent,
        PlatformMenuButtonCompactExampleComponent,
        PlatformMenuButtonHeaderComponent
    ],
    imports: [
        FundamentalNgxCoreModule,
        FundamentalNgxPlatformModule,
        SharedDocumentationModule,
        SchemaModule.forRoot(PLATFORM_COMPONENT_SCHEMAS),
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES),
        ScrollingModule
    ],
    providers: [{ provide: 'CURRENT_LIB', useValue: 'platform' }, StackblitzService]
})
export class PlatformDocumentationModule { }
