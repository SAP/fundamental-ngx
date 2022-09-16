import { NgModule } from '@angular/core';
import { SchemaModule } from '@fundamental-ngx/docs/schema';
import { COMPONENT_SCHEMAS } from './schemas';

@NgModule({
    imports: [SchemaModule.forRoot(COMPONENT_SCHEMAS)],
    exports: [SchemaModule]
})
export class CoreSchemaModule {}
