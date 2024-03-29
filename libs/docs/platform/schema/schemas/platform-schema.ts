import { Schemas } from '@fundamental-ngx/docs/schema';

// components
import { buttonSchema } from './button-schema';
import { sliderSchema } from './slider-schema';
import { tableSchema } from './table-schema';

export const PLATFORM_COMPONENT_SCHEMAS: Schemas = {
    button: buttonSchema,
    'fdp-table': tableSchema,
    'fdp-slider': sliderSchema
};
