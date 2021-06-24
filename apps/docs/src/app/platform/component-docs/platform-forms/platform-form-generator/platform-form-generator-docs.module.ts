import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { PlatformCheckboxModule, FdpFormGroupModule, PlatformButtonModule, PlatformSliderModule, PlatformFormGeneratorModule } from '@fundamental-ngx/platform';
import { PlatformFormGeneratorHeaderComponent } from './platform-form-generator-header/platform-form-generator-header.component';
import { PlatformFormGeneratorDocsComponent } from './platform-form-generator-docs.component';
import { PlatformFormGeneratorExampleComponent } from './platform-form-generator-examples/platform-form-generator-example.component';
import {
    PlatformFormGeneratorCustomComponentExampleComponent,
    PlatformFormGeneratorCustomSliderElement
} from './platform-form-generator-examples/platform-form-generator-custom-component-example.component';
import { PlatformFormGeneratorObservableExampleComponent } from './platform-form-generator-examples/platform-form-generator-observable-example.component';
import { PlatformFormGeneratorProgramaticSubmitComponent } from './platform-form-generator-examples/platform-form-generator-programatic-submit.component';
import { PlatformFormGeneratorCustomErrorExampleComponent } from './platform-form-generator-examples/platform-form-generator-custom-error-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformFormGeneratorHeaderComponent,
        children: [
            { path: '', component: PlatformFormGeneratorDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.formGenerator } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformCheckboxModule,
        PlatformFormGeneratorModule,
        FdpFormGroupModule,
        PlatformButtonModule,
        PlatformSliderModule,
        BusyIndicatorModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformFormGeneratorDocsComponent,
        PlatformFormGeneratorHeaderComponent,
        PlatformFormGeneratorExampleComponent,
        PlatformFormGeneratorCustomComponentExampleComponent,
        PlatformFormGeneratorCustomSliderElement,
        PlatformFormGeneratorObservableExampleComponent,
        PlatformFormGeneratorProgramaticSubmitComponent,
        PlatformFormGeneratorCustomErrorExampleComponent,
    ]
})
export class PlatformFormGeneratorDocsModule {}
