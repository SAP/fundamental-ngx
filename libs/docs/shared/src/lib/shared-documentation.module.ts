import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
// services
import { SchemaModule } from '@fundamental-ngx/docs/schema';
import { SectionsToolbarComponent } from './core-helpers/sections-toolbar/sections-toolbar.component';
import { ToolbarDocsComponent } from './core-helpers/toolbar/toolbar.component';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';
import { FilterPipe } from './core-helpers/pipes/filter.pipe';
import { SortByPipe } from './core-helpers/pipes/sort.pipe';
import { DocumentationBaseComponent } from './documentation-base.component';
import { DocsService } from './services/docs.service';
import { LERNA_JSON } from './tokens/lerna-json.token';
import { PACKAGE_JSON } from './tokens/package-json.token';

/** PROVIDES DEPENDENCIES REQUIRED TO BUILD DOCUMENTATION SHELL */

@NgModule({
    imports: [
        MenuModule,
        FormsModule,
        ListModule,
        IconModule,
        ButtonModule,
        CommonModule,
        RouterModule,
        ShellbarModule,
        InputGroupModule,
        SideNavigationModule,
        MarkdownModule.forChild(),
        ToolbarDocsComponent,
        DocumentationBaseComponent,
        SectionsToolbarComponent,
        SortByPipe,
        FilterPipe
    ],
    exports: [
        CommonModule,
        SchemaModule,
        ToolbarDocsComponent,
        DocumentationBaseComponent,
        SectionsToolbarComponent,
        SortByPipe,
        FilterPipe
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedDocumentationModule {
    static forRoot(props: {
        packageJson: Record<string, any>;
        lernaJson: Record<string, any>;
    }): ModuleWithProviders<SharedDocumentationModule> {
        return {
            ngModule: SharedDocumentationModule,
            providers: [
                {
                    provide: PACKAGE_JSON,
                    useValue: props.packageJson
                },
                {
                    provide: LERNA_JSON,
                    useValue: props.lernaJson
                },
                DocsService
            ]
        };
    }
}
