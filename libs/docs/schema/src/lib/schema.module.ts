import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SchemaComponent } from './containers/schema/schema.component';
import { SchemaGroupComponent } from './containers/schema-group/schema-group.component';
import { SchemaFactoryService } from './services/schema-factory/schema-factory.service';
import { AsFormControlPipe, AsFormGroupPipe } from './pipes/type-casting.pipe';
import { Schemas, SCHEMAS } from './consts/schemas';
import { FormModule } from '@fundamental-ngx/core/form';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ButtonModule } from '@fundamental-ngx/core/button';

@NgModule({
    declarations: [SchemaComponent, SchemaGroupComponent, AsFormControlPipe, AsFormGroupPipe],
    imports: [CommonModule, ReactiveFormsModule, FormModule, CheckboxModule, ButtonModule],
    exports: [SchemaComponent]
})
export class SchemaModule {
    static forRoot(componentSchemas: Schemas): ModuleWithProviders<SchemaModule> {
        return {
            ngModule: SchemaModule,
            providers: [
                SchemaFactoryService,
                {
                    provide: SCHEMAS,
                    useValue: componentSchemas
                }
            ]
        };
    }
}
