import { Schema } from '@fundamental-ngx/docs/schema';

export const timeSchema: Schema = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                hour: {
                    type: 'integer'
                },
                minute: {
                    type: 'integer'
                },
                second: {
                    type: 'integer'
                }
            }
        }
    },
    type: 'object'
};
