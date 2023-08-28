import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PlatformInputDocsComponent } from './platform-input-docs.component';
import { PlatformInputHeaderComponent } from './platform-input-header/platform-input-header.component';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformInputModule } from '@fundamental-ngx/platform/form';
import { PlatformInputAutoCompleteValidationExampleComponent } from './examples/platform-input-auto-complete-validation-example.component';
import { PlatformInputExampleComponent } from './examples/platform-input-example.component';
import { PlatformInputReactiveMinMaxValidationExampleComponent } from './examples/platform-input-reactive-min-max-validation-example.component';
import { PlatformInputReactiveValidationExampleComponent } from './examples/platform-input-reactive-validation-example.component';

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
        RouterModule.forChild(routes),
        PlatformInputExampleComponent,
        PlatformInputHeaderComponent,
        PlatformInputDocsComponent,
        PlatformInputReactiveValidationExampleComponent,
        PlatformInputAutoCompleteValidationExampleComponent,
        PlatformInputReactiveMinMaxValidationExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('input')]
})
export class PlatformInputDocsModule {}
