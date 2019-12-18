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
    PlatformButtonOptionsExampleComponent,
    PlatformButtonSizesExampleComponent,
    PlatformButtonStateExampleComponent,
    PlatformButtonTypesExampleComponent,
    PlatformButtonTruncateExampleComponent
} from '../platform/component-docs/platform-button/platform-button-examples/platform-button-examples.component';
import {
    PlatformActionbarExamplesComponent
} from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-simple-example.component';
import {PlatformActionbarWithBackButtonExampleComponent} from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-with-back-button-example.component';
import {PlatformActionbarWithDescriptionExampleComponent} from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-with-description-example.component';
import {PlatformActionbarWithLongPageTitleExampleComponent} from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-with-long-title-example.component';
import {PlatformActionbarEditTitleExampleComponent} from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-edit-title-example.component';
import {PlatformActionbarWithContextualMenuExampleComponent} from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-contextual-menu-example.component';
import {PlatformActionbarWithPositiveNegativeActionsExampleComponent} from '../platform/component-docs/platform-action-bar/platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component';
import { PlatformActionbarHeaderComponent } from '../platform/component-docs/platform-action-bar/platform-action-bar-header/platform-action-bar-header.component';
import {PlatformActionBarDocsComponent} from '../platform/component-docs/platform-action-bar/platform-action-bar-docs.component';
import { SchemaModule } from '../schema/schema.module';
import { PLATFORM_COMPONENT_SCHEMAS } from './component-docs/schemas';
import { PlatformMenuDocsComponent } from './component-docs/platform-menu/platform-menu-docs.component';
import { PlatformMenuHeaderComponent } from './component-docs/platform-menu/platform-menu-header/platform-menu-header.component';
import { PlatformMenuBasicExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-basic-example.component';
import { PlatformMenuComplexExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-complex-example.component';
import { PlatformMenuSeparatorExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-separator-example.component';
import { PlatformMenuGroupExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-group-example.component';
import { PlatformMenuIconsExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-icons-example.component';
import { PlatformMenuClickCloseExampleComponent } from './component-docs/platform-menu/platform-menu-examples/platform-menu-click-close-example.component';
@NgModule({
    declarations: [
        PlatformDocumentationComponent,
        PlatformHomeComponent,
        PlatformButtonDocsComponent,
        PlatformButtonIconsExampleComponent,
        PlatformButtonOptionsExampleComponent,
        PlatformButtonSizesExampleComponent,
        PlatformButtonTypesExampleComponent,
        PlatformButtonStateExampleComponent,
        PlatformButtonHeaderComponent,
        PlatformButtonTruncateExampleComponent,
        PlatformActionBarDocsComponent,
        PlatformActionbarHeaderComponent,
        PlatformActionbarExamplesComponent,
        PlatformActionbarWithBackButtonExampleComponent,
        PlatformActionbarWithDescriptionExampleComponent,
        PlatformActionbarWithLongPageTitleExampleComponent,
        PlatformActionbarEditTitleExampleComponent,
        PlatformActionbarWithContextualMenuExampleComponent,
        PlatformActionbarWithPositiveNegativeActionsExampleComponent,
        PlatformMenuDocsComponent,
        PlatformMenuHeaderComponent,
        PlatformMenuBasicExampleComponent,
        PlatformMenuGroupExampleComponent,
        PlatformMenuSeparatorExampleComponent,
        PlatformMenuIconsExampleComponent,
        PlatformMenuComplexExampleComponent,
        PlatformMenuClickCloseExampleComponent,

        NewComponentComponent
    ],
    imports: [
        SharedDocumentationModule,
        SchemaModule.forRoot(PLATFORM_COMPONENT_SCHEMAS),
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES)
    ],
    providers: [{ provide: 'CURRENT_LIB', useValue: 'platform' }]
})
export class PlatformDocumentationModule {}
