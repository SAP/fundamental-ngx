import { Icons } from '@fundamental-ngx/docs/shared';

export const inputGroupSchema = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                placement: {
                    type: 'string',
                    enum: ['before', 'after']
                },
                inline: {
                    type: 'boolean'
                },
                placeholder: {
                    type: 'string'
                },
                ngModel: {
                    type: 'string'
                },
                addOnText: {
                    type: 'string'
                },
                glyph: {
                    type: 'string',
                    enum: Icons
                },
                button: {
                    type: 'boolean'
                },
                state: {
                    type: 'string',
                    enum: ['', 'success', 'error', 'information', 'warning']
                }
            }
        },
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
