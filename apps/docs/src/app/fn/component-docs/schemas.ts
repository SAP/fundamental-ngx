import { Schema } from '../../schema/models/schema.model';

export const COMPONENT_SCHEMAS: { [name: string]: Schema } = {
    media: {
        properties: {
            image: {
                type: 'string'
            },
            alt: {
                type: 'string'
            }
        },
        type: 'object'
    }
};
