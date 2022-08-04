import { Routes, RouterModule } from '@angular/router';
import { PlatformInputHeaderComponent } from './platform-input-header/platform-input-header.component';
import { PlatformInputDocsComponent } from './platform-input-docs.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformInputModule, FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { PlatformInputExampleComponent } from './platform-input-example/platform-input-example.component';
import { PlatformInputReactiveValidationExampleComponent } from './platform-input-example/platform-input-reactive-validation-example.component';
import { PlatformInputAutoCompleteValidationExampleComponent } from './platform-input-example/platform-input-auto-complete-validation-example.component';
import { PlatformInputReactiveMinMaxValidationExampleComponent } from './platform-input-example/platform-input-reactive-min-max-validation-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: PlatformInputHeaderComponent,
        children: [
            { path: '', component: PlatformInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.input } }
        ]
    }
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        PopoverModule,
        FdpFormGroupModule,
        PlatformInputModule,
        PlatformButtonModule,
        SharedDocumentationPageModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: [
        PlatformInputExampleComponent,
        PlatformInputHeaderComponent,
        PlatformInputDocsComponent,
        PlatformInputReactiveValidationExampleComponent,
        PlatformInputAutoCompleteValidationExampleComponent,
        PlatformInputReactiveMinMaxValidationExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-input')]
})
export class PlatformInputDocsModule {}
