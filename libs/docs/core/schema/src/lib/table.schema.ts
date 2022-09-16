import { Schema } from '@fundamental-ngx/docs/schema';

export const tableSchema: Schema = {
    properties: {
        state: {
            type: 'object',
            properties: {
                disabled: {
                    type: 'boolean'
                }
            }
        }
    },
    type: 'object'
};
