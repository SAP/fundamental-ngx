import { Schema } from '../../schema/models/schema.model';

// components
import { BadgeLabelComponent } from './badge-label/badge-label.component';
import { ButtonComponent } from './button/button.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { AlertComponent } from './alert/alert.component';
import { IconComponent } from './icon/icon.component';
import { IdentifierComponent } from './identifier/identifier.component';
import { InlineHelpComponent } from './inline-help/inline-help.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { ImageComponent } from './image/image.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ListComponent } from './list/list.component';
import { TabsComponent } from './tabs/tabs.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TreeComponent } from './tree/tree.component';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';
import { TileComponent } from './tile/tile.component';

export const COMPONENT_SCHEMAS: { [name: string]: Schema } = {
  badgeLabel: BadgeLabelComponent.schema,
  button: ButtonComponent.schema,
  buttonGroup: ButtonGroupComponent.schema,
  alert: AlertComponent.schema,
  icon: IconComponent.schema,
  identifier: IdentifierComponent.schema,
  inlineHelp: InlineHelpComponent.schema,
  inputGroup: InputGroupComponent.schema,
  image: ImageComponent.schema,
  pagination: PaginationComponent.schema,
  list: ListComponent.schema,
  dropdown: DropdownComponent.schema,
  modal: ModalComponent.schema,
  tabs: TabsComponent.schema,
  table: TableComponent.schema,
  tile: TileComponent.schema,
  tree: TreeComponent.schema,
  media: {
    properties: {
      image: {
        type: 'string'
      },
      alt: {
        type: 'string'
      }
    },
    type: 'object'
  }
};
