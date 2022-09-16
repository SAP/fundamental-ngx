import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

export const tableSchema = {
    properties: {
        table: {
            type: 'object',
            properties: {
                contentDensity: {
                    type: 'string',
                    enum: [ContentDensityMode.COMPACT, ContentDensityMode.COZY, ContentDensityMode.CONDENSED]
                },
                selectionMode: {
                    type: 'string',
                    enum: ['none', 'single', 'multiple']
                },
                freezeColumnsTo: {
                    type: 'string',
                    enum: ['', 'name', 'description', 'price.value']
                },
                noHorizontalBorders: {
                    type: 'boolean'
                },
                noVerticalBorders: {
                    type: 'boolean'
                },
                noBorders: {
                    type: 'boolean'
                },
                noBodyBorders: {
                    type: 'boolean'
                },
                noOuterBorders: {
                    type: 'boolean'
                },
                loading: {
                    type: 'boolean'
                },
                semanticHighlighting: {
                    type: 'boolean'
                }
            }
        },
        'table-toolbar': {
            type: 'object',
            properties: {
                title: {
                    type: 'string'
                },
                hideItemCount: {
                    type: 'boolean'
                }
            }
        },
        'first-column': {
            type: 'object',
            properties: {
                align: {
                    type: 'string',
                    enum: ['start', 'center', 'end']
                },
                sortable: {
                    type: 'boolean'
                },
                filterable: {
                    type: 'boolean'
                },
                groupable: {
                    type: 'boolean'
                },
                width: {
                    type: 'string'
                }
            }
        }
    },
    type: 'object'
};
