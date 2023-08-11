import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformSliderModule } from '@fundamental-ngx/platform/slider';
import {
    FdpFormGroupModule,
    PlatformCheckboxModule,
    PlatformFormGeneratorModule
} from '@fundamental-ngx/platform/form';
import { PlatformFormGeneratorHeaderComponent } from './platform-form-generator-header/platform-form-generator-header.component';
import { PlatformFormGeneratorDocsComponent } from './platform-form-generator-docs.component';
import { PlatformFormGeneratorExampleComponent } from './examples/platform-form-generator-example.component';
import {
    PlatformFormGeneratorCustomComponentExampleComponent,
    PlatformFormGeneratorCustomSliderElementComponent
} from './examples/platform-form-generator-custom-component-example.component';
import { PlatformFormGeneratorObservableExampleComponent } from './examples/platform-form-generator-observable-example.component';
import { PlatformFormGeneratorProgramaticSubmitComponent } from './examples/platform-form-generator-programatic-submit.component';
import { PlatformFormGeneratorCustomErrorExampleComponent } from './examples/platform-form-generator-custom-error-example.component';
import { PlatformFormGeneratorFieldLayoutExampleComponent } from './examples/platform-form-generator-field-layout-example.component';
import { PlatformFormGeneratorNoColonsExampleComponent } from './examples/platform-form-generator-no-colons-example.component';
import { PlatformFormGeneratorCustomFieldLayoutExampleComponent } from './examples/platform-form-generator-custom-field-layout-example.component';
import { PlatformFormGeneratorGroupingExampleComponent } from './examples/platform-form-generator-grouping-example.component';
import { PlatformFormGeneratorInlineHelpExampleComponent } from './examples/platform-form-generator-inline-help-example.component';
import { TableModule } from '@fundamental-ngx/core/table';
import { PlatformFormGeneratorLoadingExampleComponent } from './examples/loading/platform-form-generator-loading-example.component';
import {
    PlatformFormGeneratorShowNewItemsExampleComponent,
    PlatformFormGeneratorCustomAddNewItemComponent
} from './examples/platform-form-generator-show-new-items-example.component';

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
        BusyIndicatorModule,
        TableModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformFormGeneratorDocsComponent,
        PlatformFormGeneratorHeaderComponent,
        PlatformFormGeneratorExampleComponent,
        PlatformFormGeneratorCustomComponentExampleComponent,
        PlatformFormGeneratorCustomSliderElementComponent,
        PlatformFormGeneratorObservableExampleComponent,
        PlatformFormGeneratorProgramaticSubmitComponent,
        PlatformFormGeneratorCustomErrorExampleComponent,
        PlatformFormGeneratorFieldLayoutExampleComponent,
        PlatformFormGeneratorNoColonsExampleComponent,
        PlatformFormGeneratorCustomFieldLayoutExampleComponent,
        PlatformFormGeneratorGroupingExampleComponent,
        PlatformFormGeneratorInlineHelpExampleComponent,
        PlatformFormGeneratorLoadingExampleComponent,
        PlatformFormGeneratorShowNewItemsExampleComponent,
        PlatformFormGeneratorCustomAddNewItemComponent
    ],
    providers: [currentComponentProvider('form-generator')]
})
export class PlatformFormGeneratorDocsModule {}
