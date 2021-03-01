import { Schema } from '../../schema/models/schema.model';

// components
import { PlatformButtonDocsComponent } from './platform-button/platform-button-docs.component';
import { PlatformSliderDocsComponent } from './platform-slider/slider-docs.component';
import { PlatformTableDocsComponent } from './platform-table/platform-table-docs.component';

export const PLATFORM_COMPONENT_SCHEMAS: { [name: string]: Schema } = {
    button: PlatformButtonDocsComponent.schema,
    'fdp-table': PlatformTableDocsComponent.schema,
    'fdp-slider': PlatformSliderDocsComponent.schema
};
