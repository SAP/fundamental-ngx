import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

// containers
import { SchemaComponent } from './containers/schema/schema.component';
import { SchemaGroupComponent } from './containers/schema-group/schema-group.component';

// services
import { SchemaFactoryService } from './services/schema-factory/schema-factory.service';

// models
import { Schema } from './models/schema.model';

@NgModule({
    declarations: [SchemaComponent, SchemaGroupComponent],
    imports: [CommonModule, ReactiveFormsModule, FundamentalNgxCoreModule, FundamentalNgxPlatformModule],
    exports: [SchemaComponent]
})
export class SchemaModule {
    static forRoot(componentSchemas: { [name: string]: Schema }): ModuleWithProviders<SchemaModule> {
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
