import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { SchemaModule } from '../schema/schema.module';

// modules
import { BadgeLabelModule } from '../../../src/badge-label/badge-label.module';
import { BreadcrumbModule } from '../../../src/breadcrumb/breadcrumb.module';
import { ButtonModule } from '../../../src/button/button.module';
import { ButtonGroupModule } from '../../../src/button-group/button-group.module';
import { AlertModule } from '../../../src/alert/alert.module';
import { IconModule } from '../../../src/icon/icon.module';
import { IdentifierModule } from '../../../src/identifier/identifier.module';
import { InlineHelpModule } from '../../../src/inline-help/inline-help.module';
import { InputGroupModule } from '../../../src/input-group/input-group.module';
import { ImageModule } from '../../../src/image/image.module';
import { DropdownModule } from '../../../src/dropdown/dropdown.module';
import { PaginationModule } from '../../../src/pagination/pagination.module';
import { ListModule } from '../../../src/list/list.module';
import { TabsModule } from '../../../src/tabs/tabs.module';
import { TreeModule } from '../../../src/tree/tree.module';
import { ModalModule } from '../../../src/modal/modal.module';
import { TableModule } from '../../../src/table/table.module';
import { ActionBarModule } from '../../../src/action-bar/action-bar.module';
import { PanelModule } from '../../../src/panel/panel.module';
import { MegaMenuModule } from '../../../src/mega-menu/mega-menu.module';
import { TileModule } from '../../../src/tile/tile.module';

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

import { COMPONENT_SCHEMAS } from './containers/schemas';

const ROUTES: Routes = [
    {
        path: '',
        component: DocumentationComponent,
        children: [
            { path: '', redirectTo: 'action-bar', pathMatch: 'full' },
            { path: 'action-bar', component: ActionBarDocsComponent },
            { path: 'alert', component: AlertDocsComponent },
            { path: 'badgeLabel', component: BadgeLabelDocsComponent },
            { path: 'breadcrumb', component: BreadcrumbDocsComponent },
            { path: 'button', component: ButtonDocsComponent },
            { path: 'buttonGroup', component: ButtonGroupDocsComponent },
            { path: 'icon', component: IconDocsComponent },
            { path: 'identifier', component: IdentifierDocsComponent },
            { path: 'image', component: ImageDocsComponent },
            { path: 'inlineHelp', component: InlineHelpDocsComponent },
            { path: 'inputGroup', component: InputGroupDocsComponent },
            { path: 'alert', component: AlertDocsComponent },
            { path: 'dropdown', component: DropdownDocsComponent },
            { path: 'pagination', component: PaginationDocsComponent },
            { path: 'list', component: ListDocsComponent },
            { path: 'megaMenu', component: MegaMenuDocsComponent },
            { path: 'modal', component: ModalDocsComponent },
            { path: 'panel', component: PanelDocsComponent },
            { path: 'tabs', component: TabsDocsComponent },
            { path: 'table', component: TableDocsComponent },
            { path: 'tile', component: TileDocsComponent },
            { path: 'tree', component: TreeDocsComponent }
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
        BadgeLabelDocsComponent,
        BreadcrumbDocsComponent,
        ButtonDocsComponent,
        ButtonGroupDocsComponent,
        AlertDocsComponent,
        IconDocsComponent,
        IdentifierDocsComponent,
        InlineHelpDocsComponent,
        InputGroupDocsComponent,
        ImageDocsComponent,
        DropdownDocsComponent,
        ModalDocsComponent,
        ListDocsComponent,
        PaginationDocsComponent,
        TabsDocsComponent,
        TableDocsComponent,
        TreeDocsComponent,
        ActionBarDocsComponent,
        PanelDocsComponent,
        MegaMenuDocsComponent,
        TileDocsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(ROUTES),
        SchemaModule.forRoot(COMPONENT_SCHEMAS),
        BadgeLabelModule,
        BreadcrumbModule,
        ButtonModule,
        ButtonGroupModule,
        AlertModule,
        IconModule,
        IdentifierModule,
        InlineHelpModule,
        InputGroupModule,
        ImageModule,
        DropdownModule,
        ModalModule,
        PaginationModule,
        ListModule,
        TabsModule,
        TableModule,
        TreeModule,
        ActionBarModule,
        PanelModule,
        MegaMenuModule,
        TileModule
    ]
})
export class DocumentationModule {}

import { DomSanitizer } from '@angular/platform-browser';
