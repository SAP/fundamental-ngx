import { Injector, NgModule } from '@angular/core';
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
    ContentDensityService,
    InputGroupModule,
    MenuModule,
    ShellbarModule,
    SideNavigationModule
} from '@fundamental-ngx/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SortByPipe } from './core-helpers/pipes/sort.pipe';
import { FilterPipe } from './core-helpers/pipes/filter.pipe';

/** PROVIDES DEPENDENCIES REQUIRED TO BUILD DOCUMENTATION SHELL */

@NgModule({
    declarations: [SearchPipe, ToolbarDocsComponent, SectionsToolbarComponent, SortByPipe, FilterPipe],
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
        SortByPipe,
        FilterPipe
    ]
})
export class SharedDocumentationModule {
}
