export const alertSchema = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                dismissible: {
                    type: 'boolean'
                },
                mousePersist: {
                    type: 'boolean'
                },
                width: {
                    type: 'string'
                },
                message: {
                    type: 'string'
                },
                duration: {
                    type: 'string'
                }
            }
        },
        modifier: {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    enum: ['default', 'warning', 'error', 'success', 'information']
                }
            }
        }
    },
    type: 'object'
};
