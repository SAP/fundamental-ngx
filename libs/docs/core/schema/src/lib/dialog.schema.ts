export const dialogSchema: any = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                hasBackdrop: {
                    type: 'boolean'
                },
                backdropClickCloseable: {
                    type: 'boolean'
                },
                escKeyCloseable: {
                    type: 'boolean'
                },
                focusTrapped: {
                    type: 'boolean'
                },
                fullScreen: {
                    type: 'boolean'
                },
                mobile: {
                    type: 'boolean'
                },
                mobileOuterSpacing: {
                    type: 'boolean'
                },
                draggable: {
                    type: 'boolean'
                },
                resizable: {
                    type: 'boolean'
                },
                verticalPadding: {
                    type: 'boolean'
                },
                responsivePadding: {
                    type: 'boolean'
                },
                width: {
                    type: 'string'
                },
                height: {
                    type: 'string'
                },
                minHeight: {
                    type: 'string'
                },
                maxHeight: {
                    type: 'string'
                },
                minWidth: {
                    type: 'string'
                },
                maxWidth: {
                    type: 'string'
                }
            }
        }
    },
    type: 'object'
};
