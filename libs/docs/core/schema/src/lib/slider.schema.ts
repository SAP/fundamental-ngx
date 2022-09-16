export const sliderSchema: any = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                mode: {
                    type: 'string',
                    enum: ['single', 'range']
                },
                min: {
                    type: 'integer'
                },
                max: {
                    type: 'integer'
                },
                step: {
                    type: 'integer'
                },
                jump: {
                    type: 'integer'
                },
                hideProgressBar: {
                    type: 'boolean'
                },
                showTicks: {
                    type: 'boolean'
                },
                showTicksLabels: {
                    type: 'boolean'
                },
                disabled: {
                    type: 'boolean'
                }
            }
        }
    },
    type: 'object'
};
