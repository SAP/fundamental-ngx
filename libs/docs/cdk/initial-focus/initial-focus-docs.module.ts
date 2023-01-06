import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { InitialFocusHeaderComponent } from './initial-focus-header/initial-focus-header.component';
import { InitialFocusDocsComponent } from './initial-focus-docs.component';
import { examples } from './examples';
import { UtilsModule } from '@fundamental-ngx/cdk/utils';
import { NestedElementsExampleComponent } from './examples/nested-elements-example/nested-elements-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { StepInputModule } from '@fundamental-ngx/core/step-input';
import { SliderModule } from '@fundamental-ngx/core/slider';

const routes: Routes = [
    {
        path: '',
        component: InitialFocusHeaderComponent,
        children: [
            { path: '', component: InitialFocusDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.utils } }
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
        SliderModule
    ],
    exports: [RouterModule, NestedElementsExampleComponent],
    declarations: [examples, InitialFocusDocsComponent, InitialFocusHeaderComponent, NestedElementsExampleComponent],
    providers: [currentComponentProvider('initial-focus')]
})
export class InitialFocusDocsModule {}
