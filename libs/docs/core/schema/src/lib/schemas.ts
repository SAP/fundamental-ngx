import { Schemas } from '@fundamental-ngx/docs/schema';

// components
import { alertSchema } from './alert.schema';
import { buttonSchema } from './button.schema';
import { dialogSchema } from './dialog.schema';
import { inputGroupSchema } from './input-group.schema';
import { messageStripSchema } from './message-strip.schema';
import { paginationSchema } from './pagination.schema';
import { ratingIndicatorSchema } from './rating-indicator.schema';
import { sliderSchema } from './slider.schema';
import { switchSchema } from './switch.schema';
import { tableSchema } from './table.schema';
import { tabsSchema } from './tabs.schema';
import { timeSchema } from './time.schema';

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
    ratingIndicator: ratingIndicatorSchema,
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
