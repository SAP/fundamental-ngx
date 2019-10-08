import { Schema } from '../../schema/models/schema.model';

// components
import { BadgeLabelDocsComponent } from './badge-label/badge-label-docs.component';
import { ButtonDocsComponent } from './button/button-docs.component';
import { ButtonGroupDocsComponent } from './button-group/button-group-docs.component';
import { AlertDocsComponent } from './alert/alert-docs.component';
import { IconDocsComponent } from './icon/icon-docs.component';
import { IdentifierDocsComponent } from './identifier/identifier-docs.component';
import { InlineHelpDocsComponent } from './inline-help/inline-help-docs.component';
import { InputGroupDocsComponent } from './input-group/input-group-docs.component';
import { ImageDocsComponent } from './image/image-docs.component';
import { PaginationDocsComponent } from './pagination/pagination-docs.component';
import { ListDocsComponent } from './list/list-docs.component';
import { TabsDocsComponent } from './tabs/tabs-docs.component';
import { DropdownDocsComponent } from './dropdown/dropdown-docs.component';
import { TreeDocsComponent } from './tree/tree-docs.component';
import { ModalDocsComponent } from './modal/modal-docs.component';
import { TableDocsComponent } from './table/table-docs.component';
import { TileDocsComponent } from './tile/tile-docs.component';
import { TimeDocsComponent } from './time/time-docs.component';
import { ToggleDocsComponent } from './toggle/toggle-docs.component';

export const COMPONENT_SCHEMAS: { [name: string]: Schema } = {
    badgeLabel: BadgeLabelDocsComponent.schema,
    button: ButtonDocsComponent.schema,
    buttonGroup: ButtonGroupDocsComponent.schema,
    alert: AlertDocsComponent.schema,
    icon: IconDocsComponent.schema,
    identifier: IdentifierDocsComponent.schema,
    inlineHelp: InlineHelpDocsComponent.schema,
    inputGroup: InputGroupDocsComponent.schema,
    image: ImageDocsComponent.schema,
    pagination: PaginationDocsComponent.schema,
    modal: ModalDocsComponent.schema,
    list: ListDocsComponent.schema,
    tabs: TabsDocsComponent.schema,
    table: TableDocsComponent.schema,
    tile: TileDocsComponent.schema,
    time: TimeDocsComponent.schema,
    // tree: TreeDocsComponent.schema,
    toggle: ToggleDocsComponent.schema,
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
