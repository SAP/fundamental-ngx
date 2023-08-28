import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { SelectAddingExampleComponent } from './examples/select-adding-example/select-adding-example.component';
import { SelectCustomTriggerComponent } from './examples/select-custom-trigger/select-custom-trigger.component';
import { SelectFormsComponent } from './examples/select-forms/select-forms.component';
import { SelectMaxHeightExampleComponent } from './examples/select-height/select-max-height-example.component';
import { SelectNestedOptionsComponent } from './examples/select-nested-options/select-nested-options.component';
import { SelectProgrammaticExampleComponent } from './examples/select-programmatic-example/select-programmatic-example.component';
import { SelectDocsComponent } from './select-docs.component';
import { SelectHeaderComponent } from './select-header/select-header.component';

import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FormModule } from '@fundamental-ngx/core/form';
import { ListModule } from '@fundamental-ngx/core/list';
import { DeprecatedSelectCSSClasses, SelectModule } from '@fundamental-ngx/core/select';
import { SelectCustomComparatorExample } from './examples/select-custom-comparator-example/select-custom-comparator-example.component';
import { SelectMobileExampleComponent } from './examples/select-mobile-example/select-mobile-example.component';
import { SelectModeExampleComponent } from './examples/select-mode-example/select-mode-example.component';
import { SelectSemanticStateExampleComponent } from './examples/select-semantic-state-example/select-semantic-state-example.component';

const routes: Routes = [
    {
        path: '',
        component: SelectHeaderComponent,
        children: [
            { path: '', component: SelectDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.select } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SelectModule,
        DialogModule,
        ListModule,
        FormModule,
        SelectDocsComponent,
        SelectFormsComponent,
        SelectHeaderComponent,
        SelectModeExampleComponent,
        SelectNestedOptionsComponent,
        SelectMobileExampleComponent,
        SelectAddingExampleComponent,
        SelectCustomTriggerComponent,
        SelectMaxHeightExampleComponent,
        SelectProgrammaticExampleComponent,
        SelectSemanticStateExampleComponent,
        SelectCustomComparatorExample
    ],
    exports: [RouterModule],
    providers: [moduleDeprecationsProvider(DeprecatedSelectCSSClasses), currentComponentProvider('select')]
})
export class SelectDocsModules {}
