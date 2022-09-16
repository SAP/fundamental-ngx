import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { FormModule } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { SliderModule } from '@fundamental-ngx/core/slider';
import { StepInputModule } from '@fundamental-ngx/core/step-input';
import { InitialFocusModule } from '@fundamental-ngx/core/utils';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { InitialFocusHeaderComponent } from './initial-focus-header/initial-focus-header.component';
import { InitialFocusDocsComponent } from './initial-focus-docs.component';
import { InitialFocusBasicExampleComponent } from './examples/initial-focus-basic-example.component';
import { InitialFocusComplexExampleComponent } from './examples/initial-focus-complex-example.component';

const routes: Routes = [
    {
        path: '',
        component: InitialFocusHeaderComponent,
        children: [
            { path: '', component: InitialFocusDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.initialFocus } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormModule,
        InitialFocusModule,
        SelectModule,
        ComboboxModule,
        DatePickerModule,
        StepInputModule,
        SliderModule
    ],
    exports: [RouterModule],
    declarations: [
        InitialFocusDocsComponent,
        InitialFocusHeaderComponent,
        InitialFocusBasicExampleComponent,
        InitialFocusComplexExampleComponent
    ],
    providers: [currentComponentProvider('initial-focus')]
})
export class InitialFocusDocsModule {}
