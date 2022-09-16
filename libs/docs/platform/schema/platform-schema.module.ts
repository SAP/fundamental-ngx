import { NgModule } from '@angular/core';
import { SchemaModule } from '@fundamental-ngx/docs/schema';
import { PLATFORM_COMPONENT_SCHEMAS } from './schemas/platform-schema';

@NgModule({
    imports: [SchemaModule.forRoot(PLATFORM_COMPONENT_SCHEMAS)],
    exports: [SchemaModule]
})
export class PlatformSchemaModule {}
