import { Icons } from '@fundamental-ngx/docs/shared';

export const buttonSchema = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                label: {
                    type: 'string'
                },
                fdType: {
                    type: 'string',
                    enum: [
                        '',
                        'standard',
                        'positive',
                        'negative',
                        'attention',
                        'half',
                        'ghost',
                        'transparent',
                        'emphasized',
                        'menu'
                    ]
                },
                fdMenu: {
                    type: 'boolean'
                },
                compact: {
                    type: 'boolean'
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
