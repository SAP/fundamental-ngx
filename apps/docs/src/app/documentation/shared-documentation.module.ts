import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
// services
import { SchemaModule } from '../schema/schema.module';
import { COMPONENT_SCHEMAS } from '../core/component-docs/schemas';
import { SectionsToolbarComponent } from './core-helpers/sections-toolbar/sections-toolbar.component';
import { ToolbarDocsComponent } from './core-helpers/toolbar/toolbar.component';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SortByPipe } from './core-helpers/pipes/sort.pipe';
import { FilterPipe } from './core-helpers/pipes/filter.pipe';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

/** PROVIDES DEPENDENCIES REQUIRED TO BUILD DOCUMENTATION SHELL */

@NgModule({
    declarations: [ToolbarDocsComponent, SectionsToolbarComponent, SortByPipe, FilterPipe],
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
    exports: [CommonModule, SchemaModule, ToolbarDocsComponent, SectionsToolbarComponent, SortByPipe, FilterPipe]
})
export class SharedDocumentationModule {}
