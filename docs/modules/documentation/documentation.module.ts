import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { SchemaModule } from '../schema/schema.module';

// modules
import { FundamentalNgxModule } from '../../../projects/fundamental-ngx/src/lib/fundamental-ngx.module';

// components
import { DocumentationComponent } from './components/documentation/documentation.component';
import { PlayGroundComponent } from './components/playground/playground.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { HtmlExampleComponent } from './components/html-example/html-example.component';
import { HeaderComponent } from './components/header/header.component';
import { DescriptionComponent } from './components/description/description';
import { SeparatorComponent } from './components/seperator/seperator.component';
import { ImportComponent } from './components/import/import.component';

// containers
import { BadgeLabelDocsComponent } from './containers/badge-label/badge-label-docs.component';
import { BreadcrumbDocsComponent } from './containers/breadcrumb/breadcrumb-docs.component';
import { ButtonDocsComponent } from './containers/button/button-docs.component';
import { ButtonGroupDocsComponent } from './containers/button-group/button-group-docs.component';
import { AlertDocsComponent } from './containers/alert/alert-docs.component';
import { IconDocsComponent } from './containers/icon/icon-docs.component';
import { IdentifierDocsComponent } from './containers/identifier/identifier-docs.component';
import { InlineHelpDocsComponent } from './containers/inline-help/inline-help-docs.component';
import { InputGroupDocsComponent } from './containers/input-group/input-group-docs.component';
import { ImageDocsComponent } from './containers/image/image-docs.component';
import { DropdownDocsComponent } from './containers/dropdown/dropdown-docs.component';
import { PaginationDocsComponent } from './containers/pagination/pagination-docs.component';
import { ListDocsComponent } from './containers/list/list-docs.component';
import { TabsDocsComponent } from './containers/tabs/tabs-docs.component';
import { TreeDocsComponent } from './containers/tree/tree-docs.component';
import { ModalDocsComponent } from './containers/modal/modal-docs.component';
import { TableDocsComponent } from './containers/table/table-docs.component';
import { ActionBarDocsComponent } from './containers/action-bar/action-bar-docs.component';
import { PanelDocsComponent } from './containers/panel/panel-docs.component';
import { MegaMenuDocsComponent } from './containers/mega-menu/mega-menu-docs.component';
import { TileDocsComponent } from './containers/tile/tile-docs.component';
import { FormDocsComponent } from './containers/form/form-docs.component';

import { InstallationDocsComponent } from './containers/installation/installation.component';
import { UsageDocsComponent } from './containers/usage/usage.component';

import { COMPONENT_SCHEMAS } from './containers/schemas';

import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';

export function highlightJsFactory() {
    return hljs;
}

const ROUTES: Routes = [
    {
        path: '',
        component: DocumentationComponent,
        children: [
            { path: '', redirectTo: 'installation', pathMatch: 'full' },
            { path: 'action-bar', component: ActionBarDocsComponent },
            { path: 'alert', component: AlertDocsComponent },
            { path: 'badgeLabel', component: BadgeLabelDocsComponent },
            { path: 'breadcrumb', component: BreadcrumbDocsComponent },
            { path: 'button', component: ButtonDocsComponent },
            { path: 'buttonGroup', component: ButtonGroupDocsComponent },
            { path: 'dropdown', component: DropdownDocsComponent },
            { path: 'form', component: FormDocsComponent },
            { path: 'icon', component: IconDocsComponent },
            { path: 'identifier', component: IdentifierDocsComponent },
            { path: 'image', component: ImageDocsComponent },
            { path: 'inlineHelp', component: InlineHelpDocsComponent },
            { path: 'inputGroup', component: InputGroupDocsComponent },
            { path: 'list', component: ListDocsComponent },
            { path: 'megaMenu', component: MegaMenuDocsComponent },
            { path: 'modal', component: ModalDocsComponent },
            { path: 'pagination', component: PaginationDocsComponent },
            { path: 'panel', component: PanelDocsComponent },
            { path: 'table', component: TableDocsComponent },
            { path: 'tabs', component: TabsDocsComponent },
            { path: 'tile', component: TileDocsComponent },
            { path: 'tree', component: TreeDocsComponent },
            { path: 'installation', component: InstallationDocsComponent },
            { path: 'usage', component: UsageDocsComponent }
        ]
    }
];

@NgModule({
    declarations: [
        DocumentationComponent,
        PlayGroundComponent,
        HtmlExampleComponent,
        HeaderComponent,
        DescriptionComponent,
        PropertiesComponent,
        SeparatorComponent,
        ImportComponent,
        ActionBarDocsComponent,
        AlertDocsComponent,
        BadgeLabelDocsComponent,
        BreadcrumbDocsComponent,
        ButtonDocsComponent,
        ButtonGroupDocsComponent,
        DropdownDocsComponent,
        FormDocsComponent,
        IconDocsComponent,
        IdentifierDocsComponent,
        InlineHelpDocsComponent,
        InputGroupDocsComponent,
        ImageDocsComponent,
        ListDocsComponent,
        MegaMenuDocsComponent,
        ModalDocsComponent,
        TabsDocsComponent,
        TableDocsComponent,
        TileDocsComponent,
        TreeDocsComponent,
        PaginationDocsComponent,
        PanelDocsComponent,
        InstallationDocsComponent,
        UsageDocsComponent
    ],
    imports: [
        HighlightJsModule.forRoot({
            provide: HIGHLIGHT_JS,
            useFactory: highlightJsFactory
        }),
        CommonModule,
        FormsModule,
        RouterModule.forChild(ROUTES),
        SchemaModule.forRoot(COMPONENT_SCHEMAS),
        FundamentalNgxModule
    ]
})
export class DocumentationModule {}

import { DomSanitizer } from '@angular/platform-browser';
