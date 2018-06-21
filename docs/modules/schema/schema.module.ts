import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// containers
import { SchemaComponent } from './containers/schema/schema.component';
import { SchemaGroupComponent } from './containers/schema-group/schema-group.component';

// services
import { SchemaFactoryService } from './services/schema-factory/schema-factory.service';

// models
import { Schema } from './models/schema.model';

@NgModule({
    declarations: [SchemaComponent, SchemaGroupComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [SchemaComponent]
})
export class SchemaModule {
    static forRoot(componentSchemas: { [name: string]: Schema }): ModuleWithProviders {
        return {
            ngModule: SchemaModule,
            providers: [
                SchemaFactoryService,
                {
                    provide: 'SCHEMAS',
                    useValue: componentSchemas
                }
            ]
        };
    }
}
