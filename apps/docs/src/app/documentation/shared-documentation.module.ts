import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { RouterModule } from '@angular/router';

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
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DocsSectionTitleComponent } from './core-helpers/docs-section-title/docs-section-title.component';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';
import { SchemaModule } from '../schema/schema.module';
import { COMPONENT_SCHEMAS } from '../core/component-docs/schemas';
import { SearchPipe } from './core-helpers/pipes/search.pipe';
import { ToolbarComponent } from './core-helpers/toolbar/toolbar.component';
import { SectionsToolbarComponent } from './core-helpers/sections-toolbar/sections-toolbar.component';
import { HeaderTabsComponent } from './core-helpers/header-tabs/header-tabs.component';
import { ApiComponent } from './core-helpers/api/api.component';
import { sharedCoreModules } from './shared-core-modules';

@NgModule({
    declarations: [
        PlayGroundComponent,
        CodeExampleComponent,
        HeaderComponent,
        DescriptionComponent,
        SeparatorComponent,
        ImportComponent,
        DirectionalityComponent,
        ComponentExampleComponent,
        ExampleBackgroundComponent,
        DocsSectionTitleComponent,
        SearchPipe,
        ToolbarComponent,
        SectionsToolbarComponent,
        HeaderTabsComponent,
        ApiComponent
    ],

    imports: [
        MarkdownModule.forChild(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CdkTableModule,
        DragDropModule,
        SchemaModule.forRoot(COMPONENT_SCHEMAS),
        RouterModule,
        sharedCoreModules
    ],
    providers: [CopyService, ApiDocsService],
    exports: [
        PlayGroundComponent,
        CodeExampleComponent,
        HeaderComponent,
        DescriptionComponent,
        SeparatorComponent,
        ImportComponent,
        DirectionalityComponent,
        ComponentExampleComponent,
        ExampleBackgroundComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CdkTableModule,
        DragDropModule,
        DocsSectionTitleComponent,
        SchemaModule,
        SearchPipe,
        ToolbarComponent,
        SectionsToolbarComponent,
        HeaderTabsComponent,
        ApiComponent,
        sharedCoreModules
    ]
})
export class SharedDocumentationModule {}
