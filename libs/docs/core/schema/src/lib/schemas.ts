import { Schemas } from '@fundamental-ngx/docs/schema';

// components
import { buttonSchema } from './button.schema';
import { alertSchema } from './alert.schema';
import { inputGroupSchema } from './input-group.schema';
import { paginationSchema } from './pagination.schema';
import { tabsSchema } from './tabs.schema';
import { dialogSchema } from './dialog.schema';
import { messageStripSchema } from './message-strip.schema';
import { tableSchema } from './table.schema';
import { timeSchema } from './time.schema';
import { switchSchema } from './switch.schema';
import { sliderSchema } from './slider.schema';

export const COMPONENT_SCHEMAS: Schemas = {
    button: buttonSchema,
    alert: alertSchema,
    inputGroup: inputGroupSchema,
    pagination: paginationSchema,
    tabs: tabsSchema,
    dialog: dialogSchema,
    messageStrip: messageStripSchema,
    table: tableSchema,
    time: timeSchema,
    switch: switchSchema,
    slider: sliderSchema,
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
