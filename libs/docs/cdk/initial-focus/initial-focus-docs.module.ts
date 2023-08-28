import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from '@fundamental-ngx/cdk/utils';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { FormModule } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { SliderModule } from '@fundamental-ngx/core/slider';
import { StepInputModule } from '@fundamental-ngx/core/step-input';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { examples } from './examples';
import { NestedElementsExampleComponent } from './examples/nested-elements-example/nested-elements-example.component';
import { InitialFocusDocsComponent } from './initial-focus-docs.component';
import { InitialFocusHeaderComponent } from './initial-focus-header/initial-focus-header.component';

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
        UtilsModule,
        FormModule,
        SelectModule,
        ComboboxModule,
        DatePickerModule,
        StepInputModule,
        SliderModule,
        examples,
        InitialFocusDocsComponent,
        InitialFocusHeaderComponent,
        NestedElementsExampleComponent
    ],
    exports: [RouterModule, NestedElementsExampleComponent],
    providers: [currentComponentProvider('initial-focus')]
})
export class InitialFocusDocsModule {}
