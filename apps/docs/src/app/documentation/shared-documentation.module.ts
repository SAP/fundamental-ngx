import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
// services
import { SchemaModule } from '../schema/schema.module';
import { COMPONENT_SCHEMAS } from '../core/component-docs/schemas';
import { SectionsToolbarComponent } from './core-helpers/sections-toolbar/sections-toolbar.component';
import { ToolbarDocsComponent } from './core-helpers/toolbar/toolbar.component';
import { SearchPipe } from './core-helpers/pipes/search.pipe';
import {
    ButtonModule,
    InputGroupModule,
    MenuModule,
    ShellbarModule,
    SideNavigationModule
} from '@fundamental-ngx/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/** PROVIDES DEPENDENCIES REQUIRED TO BUILD DOCUMENTATION SHELL */

@NgModule({
    declarations: [
        SearchPipe,
        ToolbarDocsComponent,
        SectionsToolbarComponent
    ],
    imports: [
        MenuModule,
        FormsModule,
        ButtonModule,
        CommonModule,
        RouterModule,
        ShellbarModule,
        InputGroupModule,
        SideNavigationModule,
        MarkdownModule.forChild(),
        SchemaModule.forRoot(COMPONENT_SCHEMAS)
    ],
    exports: [
        SearchPipe,
        CommonModule,
        SchemaModule,
        ToolbarDocsComponent,
        SectionsToolbarComponent,
    ]
})
export class SharedDocumentationModule {
}
