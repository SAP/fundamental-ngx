import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import {
    FdpFormGroupModule,
    PlatformMultiComboboxMobileModule,
    PlatformMultiComboboxModule
} from '@fundamental-ngx/platform';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { PlatformMultiComboboxHeaderComponent } from './platform-multi-combobox-header/platform-multi-combobox-header.component';
import { PlatformMultiComboboxDocsComponent } from './platform-multi-combobox-docs.component';
import { MULTI_COMBOBOX_MOBILE_CONFIG } from '../../../documentation/utilities/consts';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { MultiComboboxDatasourceExampleComponent } from './examples/multi-combobox-datasource/multi-combobox-datasource-example.component';
import { MultiComboboxMobileExampleComponent } from './examples/multi-combobox-mobile/multi-combobox-mobile-example.component';
import { MultiComboboxGroupExampleComponent } from './examples/multi-combobox-group/multi-combobox-group-example.component';
import { MultiComboboxColumnsExampleComponent } from './examples/multi-combobox-columns/multi-combobox-columns-example.component';
import { MultiComboboxFormsExampleComponent } from './examples/multi-combobox-forms/multi-combobox-forms-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformMultiComboboxHeaderComponent,
        children: [
            { path: '', component: PlatformMultiComboboxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiCombobox } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FdpFormGroupModule,
        PlatformMultiComboboxModule,
        PlatformMultiComboboxMobileModule
    ],
    exports: [RouterModule],
    providers: [{ provide: MOBILE_MODE_CONFIG, useValue: MULTI_COMBOBOX_MOBILE_CONFIG, multi: true }],
    declarations: [
        PlatformMultiComboboxHeaderComponent,
        PlatformMultiComboboxDocsComponent,
        MultiComboboxDatasourceExampleComponent,
        MultiComboboxMobileExampleComponent,
        MultiComboboxGroupExampleComponent,
        MultiComboboxColumnsExampleComponent,
        MultiComboboxFormsExampleComponent
    ]
})
export class PlatformMultiComboboxDocsModule {}
