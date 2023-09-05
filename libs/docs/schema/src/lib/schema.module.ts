import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { FormModule } from '@fundamental-ngx/core/form';
import { SCHEMAS, Schemas } from './consts/schemas';
import { SchemaGroupComponent } from './containers/schema-group/schema-group.component';
import { SchemaComponent } from './containers/schema/schema.component';
import { AsFormControlPipe, AsFormGroupPipe } from './pipes/type-casting.pipe';
import { SchemaFactoryService } from './services/schema-factory/schema-factory.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormModule,
        CheckboxModule,
        ButtonModule,
        SchemaComponent,
        SchemaGroupComponent,
        AsFormControlPipe,
        AsFormGroupPipe
    ],
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
