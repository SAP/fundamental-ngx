import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
// components
import { CodeExampleComponent } from './core-helpers/code-example/code-example.component';
import { ComponentExampleComponent } from './core-helpers/component-example/component-example.component';
import { DescriptionComponent } from './core-helpers/description/description';
import { DirectionalityComponent } from './core-helpers/directionality/directionality.component';
import { ExampleBackgroundComponent } from './core-helpers/example-background/example-background.component';
import { HeaderComponent } from './core-helpers/header/header.component';
import { ImportComponent } from './core-helpers/import/import.component';
import { PlayGroundComponent } from './core-helpers/playground/playground.component';
import { SeparatorComponent } from './core-helpers/seperator/seperator.component';
// services
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { SchemaModule } from '@fundamental-ngx/docs/schema';
import { DatetimeImportantComponent } from './common-components/datetime-important/datetime-important.component';
import { ApiComponent } from './core-helpers/api/api.component';
import { CodeSnippetComponent } from './core-helpers/code-snippet/code-snippet.component';
import { DeprecatedAlertsComponent } from './core-helpers/deprecated-alerts/deprecated-alerts.component';
import { DocPageComponent } from './core-helpers/doc-page/doc-page.component';
import { DocsSectionTitleComponent } from './core-helpers/docs-section-title/docs-section-title.component';
import { HeaderTabsComponent } from './core-helpers/header-tabs/header-tabs.component';
import { I18nDocsModule } from './core-helpers/i18n-docs/i18n-docs.module';
import { ApiDocsService } from './services/api-docs.service';
import { CopyService } from './services/copy.service';
import { sharedCoreModules } from './shared-core-modules';

/** THIS MODULE PROVIDES BASIC SET OF DEPENDENCIES NEEDED TO CREATE COMPONENT EXAMPLE PAGE */
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        SchemaModule,
        sharedCoreModules,
        I18nDocsModule,
        MarkdownModule.forChild(),
        BusyIndicatorModule,
        ApiComponent,
        ImportComponent,
        HeaderComponent,
        SeparatorComponent,
        HeaderTabsComponent,
        PlayGroundComponent,
        CodeSnippetComponent,
        CodeExampleComponent,
        DescriptionComponent,
        DirectionalityComponent,
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        ExampleBackgroundComponent,
        DatetimeImportantComponent,
        DeprecatedAlertsComponent,
        DocPageComponent
    ],
    providers: [CopyService, ApiDocsService],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        SchemaModule,
        CommonModule,
        ApiComponent,
        ImportComponent,
        HeaderComponent,
        SeparatorComponent,
        HeaderTabsComponent,
        PlayGroundComponent,
        CodeSnippetComponent,
        CodeExampleComponent,
        DescriptionComponent,
        DirectionalityComponent,
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        ExampleBackgroundComponent,
        sharedCoreModules,
        DatetimeImportantComponent,
        DeprecatedAlertsComponent,
        DocPageComponent,
        I18nDocsModule
    ]
})
export class SharedDocumentationPageModule {}
