import { Schema } from '../../schema/models/schema.model';

// components
import { TabsDocsComponent } from './tabs/tabs-docs.component';
import { ButtonDocsComponent } from './button/button-docs.component';

export const COMPONENT_SCHEMAS: { [name: string]: Schema } = {
    tabs: TabsDocsComponent.schema,
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
