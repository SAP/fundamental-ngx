import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
// services
import { SchemaModule } from '@fundamental-ngx/docs/schema';
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
import { ListModule } from '@fundamental-ngx/core/list';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PACKAGE_JSON } from './tokens/package-json.token';
import { DocsService } from './services/docs.service';
import { DocumentationBaseComponent } from './documentation-base.component';
import { LERNA_JSON } from './tokens/lerna-json.token';

/** PROVIDES DEPENDENCIES REQUIRED TO BUILD DOCUMENTATION SHELL */

@NgModule({
    declarations: [ToolbarDocsComponent, DocumentationBaseComponent, SectionsToolbarComponent, SortByPipe, FilterPipe],
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
        MarkdownModule.forChild()
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
