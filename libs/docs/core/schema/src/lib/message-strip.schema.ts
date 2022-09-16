export const messageStripSchema: any = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                dismissible: {
                    type: 'boolean'
                },
                noIcon: {
                    type: 'boolean'
                },
                width: {
                    type: 'string'
                },
                message: {
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
