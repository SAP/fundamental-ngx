import { Icons } from '@fundamental-ngx/docs/shared';

export const buttonSchema = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                label: {
                    type: 'string'
                },
                buttonType: {
                    type: 'string',
                    enum: ['', 'standard', 'positive', 'transparent', 'negative', 'emphasized', 'ghost']
                },
                contentDensity: {
                    type: 'string',
                    enum: ['cozy', 'compact']
                },
                disabled: {
                    type: 'boolean'
                },
                ariaDisabled: {
                    type: 'boolean'
                },
                ariaSelected: {
                    type: 'boolean'
                },
                width: {
                    type: 'string'
                },
                icon: {
                    type: 'string',
                    enum: Icons
                }
            }
        }
    },
    type: 'object'
};
