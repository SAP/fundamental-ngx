import { Schema } from '@fundamental-ngx/docs/schema';

export const ratingIndicatorSchema: Schema = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                allowHalves: {
                    type: 'boolean'
                },
                disabled: {
                    type: 'boolean'
                },
                displayMode: {
                    type: 'boolean'
                },
                nonInteractive: {
                    type: 'boolean'
                },
                size: {
                    type: 'string',
                    enum: ['xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed']
                },
                indicatorCapacity: {
                    type: 'string',
                    enum: [1, 2, 3, 4, 5, 6, 7]
                }
            }
        }
    },
    type: 'object'
};
