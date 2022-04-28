import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// eslint-disable-next-line no-restricted-imports
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
// eslint-disable-next-line no-restricted-imports
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

// containers
import { SchemaComponent } from './containers/schema/schema.component';
import { SchemaGroupComponent } from './containers/schema-group/schema-group.component';

// services
import { SchemaFactoryService } from './services/schema-factory/schema-factory.service';

// models
import { Schema } from './models/schema.model';

// pipes
import { AsFormControlPipe, AsFormGroupPipe } from './pipes/type-casting.pipe';

@NgModule({
    declarations: [SchemaComponent, SchemaGroupComponent, AsFormControlPipe, AsFormGroupPipe],
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
