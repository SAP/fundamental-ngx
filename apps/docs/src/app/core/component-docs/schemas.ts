import { Schemas } from '../../schema/consts/schemas';

// components
import { ButtonDocsComponent } from './button/button-docs.component';
import { AlertDocsComponent } from './alert/alert-docs.component';
import { InputGroupDocsComponent } from './input-group/input-group-docs.component';
import { PaginationDocsComponent } from './pagination/pagination-docs.component';
import { TabsDocsComponent } from './tabs/tabs-docs.component';
import { DialogDocsComponent } from './dialog/dialog-docs.component';
import { MessageStripDocsComponent } from './message-strip/message-strip-docs.component';
import { TableDocsComponent } from './table/table-docs.component';
import { TimeDocsComponent } from './time/time-docs.component';
import { SwitchDocsComponent } from './switch/switch-docs.component';
import { SliderDocsComponent } from './slider/slider-docs.component';

export const COMPONENT_SCHEMAS: Schemas = {
    button: ButtonDocsComponent.schema,
    alert: AlertDocsComponent.schema,
    inputGroup: InputGroupDocsComponent.schema,
    pagination: PaginationDocsComponent.schema,
    messageStrip: MessageStripDocsComponent.schema,
    dialog: DialogDocsComponent.schema,
    tabs: TabsDocsComponent.schema,
    table: TableDocsComponent.schema,
    time: TimeDocsComponent.schema,
    switch: SwitchDocsComponent.schema,
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
    },
    slider: SliderDocsComponent.schema
};
