import { Schema } from '@fundamental-ngx/docs/schema';

export const paginationSchema: Schema = {
    properties: {
        properties: {
            type: 'object',
            properties: {
                totalItems: {
                    type: 'integer'
                },
                itemsPerPage: {
                    type: 'integer'
                },
                currentPage: {
                    type: 'integer'
                },
                mobile: {
                    type: 'boolean'
                }
            }
        }
    },
    type: 'object'
};
