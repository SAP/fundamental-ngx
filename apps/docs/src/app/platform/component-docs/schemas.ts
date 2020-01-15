import { Schema } from '../../schema/models/schema.model';

// components
import { PlatformButtonDocsComponent } from './platform-button/platform-button-docs.component';
import { PlatformCarosuelDocsComponent } from './platform-carosuel/platform-carosuel-docs.component';

export const PLATFORM_COMPONENT_SCHEMAS: { [name: string]: Schema } = {
    button: PlatformButtonDocsComponent.schema,
    carosuel: PlatformCarosuelDocsComponent.schema
};
