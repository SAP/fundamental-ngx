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
import { ActionbarModule } from '../../../src/actionbar/actionbar.module';
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
import { BadgeLabelComponent } from './containers/badge-label/badge-label.component';
import { BreadcrumbComponent } from './containers/breadcrumb/breadcrumb.component';
import { ButtonComponent } from './containers/button/button.component';
import { ButtonGroupComponent } from './containers/button-group/button-group.component';
import { AlertComponent } from './containers/alert/alert.component';
import { IconComponent } from './containers/icon/icon.component';
import { IdentifierComponent } from './containers/identifier/identifier.component';
import { InlineHelpComponent } from './containers/inline-help/inline-help.component';
import { InputGroupComponent } from './containers/input-group/input-group.component';
import { ImageComponent } from './containers/image/image.component';
import { DropdownComponent } from './containers/dropdown/dropdown.component';
import { PaginationComponent } from './containers/pagination/pagination.component';
import { ListComponent } from './containers/list/list.component';
import { TabsComponent } from './containers/tabs/tabs.component';
import { TreeComponent } from './containers/tree/tree.component';
import { ModalComponent } from './containers/modal/modal.component';
import { TableComponent } from './containers/table/table.component';
import { ActionbarComponent } from './containers/actionbar/actionbar.component';
import { PanelComponent } from './containers/panel/panel.component';
import { MegaMenuComponent } from './containers/mega-menu/mega-menu.component';
import { TileComponent } from './containers/tile/tile.component';

import { COMPONENT_SCHEMAS } from './containers/schemas';

const ROUTES: Routes = [
  { path: '',
    component: DocumentationComponent,
    children: [
      { path: '', redirectTo: 'actionbar', pathMatch: 'full' },
      { path: 'actionbar', component: ActionbarComponent },
      { path: 'alert', component: AlertComponent },
      { path: 'badgeLabel', component: BadgeLabelComponent },
      { path: 'breadcrumb', component: BreadcrumbComponent },
      { path: 'button', component: ButtonComponent },
      { path: 'buttonGroup', component: ButtonGroupComponent },
      { path: 'icon', component: IconComponent },
      { path: 'identifier', component: IdentifierComponent },
      { path: 'image', component: ImageComponent },
      { path: 'inlineHelp', component: InlineHelpComponent },
      { path: 'inputGroup', component: InputGroupComponent },
      { path: 'alert', component: AlertComponent },
      { path: 'dropdown', component: DropdownComponent },
      { path: 'pagination', component: PaginationComponent },
      { path: 'list', component: ListComponent },
      { path: 'megaMenu', component: MegaMenuComponent },
      { path: 'modal', component: ModalComponent },
      { path: 'panel', component: PanelComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'table', component: TableComponent },
      { path: 'tile', component: TileComponent },
      { path: 'tree', component: TreeComponent }
    ]
  },
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
    BadgeLabelComponent,
    BreadcrumbComponent,
    ButtonComponent,
    ButtonGroupComponent,
    AlertComponent,
    IconComponent,
    IdentifierComponent,
    InlineHelpComponent,
    InputGroupComponent,
    ImageComponent,
    DropdownComponent,
    ModalComponent,
    ListComponent,
    PaginationComponent,
    TabsComponent,
    TableComponent,
    TreeComponent,
    ActionbarComponent,
    PanelComponent,
    MegaMenuComponent,
    TileComponent
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
    ActionbarModule,
    PanelModule,
    MegaMenuModule,
    TileModule
  ]
})
export class DocumentationModule {}

import { DomSanitizer } from '@angular/platform-browser'
