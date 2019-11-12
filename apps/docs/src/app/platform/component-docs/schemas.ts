import { Schema } from '../../schema/models/schema.model';

// components
import { PlatformButtonDocsComponent } from './platform-button/platform-button-docs.component';

export const PLATFORM_COMPONENT_SCHEMAS: { [name: string]: Schema } = {
    button: PlatformButtonDocsComponent.schema,
};
