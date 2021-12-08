import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
// components
import { PlayGroundComponent } from './core-helpers/playground/playground.component';
import { CodeExampleComponent } from './core-helpers/code-example/code-example.component';
import { HeaderComponent } from './core-helpers/header/header.component';
import { DescriptionComponent } from './core-helpers/description/description';
import { SeparatorComponent } from './core-helpers/seperator/seperator.component';
import { ImportComponent } from './core-helpers/import/import.component';
import { DirectionalityComponent } from './core-helpers/directionality/directionality.component';
import { ComponentExampleComponent } from './core-helpers/component-example/component-example.component';
import { ExampleBackgroundComponent } from './core-helpers/example-background/example-background.component';
// services
import { CopyService } from './services/copy.service';
import { ApiDocsService } from './services/api-docs.service';
import { DocsSectionTitleComponent } from './core-helpers/docs-section-title/docs-section-title.component';
import { SchemaModule } from '../schema/schema.module';
import { HeaderTabsComponent } from './core-helpers/header-tabs/header-tabs.component';
import { ApiComponent } from './core-helpers/api/api.component';
import { sharedCoreModules } from './shared-core-modules';
import { CodeSnippetComponent } from './core-helpers/code-snippet/code-snippet.component';
import { DatetimeImportantComponent } from './common-components/datetime-important/datetime-important.component';

/** THIS MODULE PROVIDES BASIC SET OF DEPENDENCIES NEEDED TO CREATE COMPONENT EXAMPLE PAGE */
@NgModule({
    declarations: [
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
        DatetimeImportantComponent
    ],
    imports: [FormsModule, CommonModule, RouterModule, SchemaModule, sharedCoreModules, MarkdownModule.forChild()],
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
        DatetimeImportantComponent
    ]
})
export class SharedDocumentationPageModule {}
