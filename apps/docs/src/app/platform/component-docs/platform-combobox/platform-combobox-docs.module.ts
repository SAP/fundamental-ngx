import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformComboboxModule, PlatformComboboxMobileModule, FdpFormGroupModule } from '@fundamental-ngx/platform';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { PlatformComboboxDocsComponent } from './platform-combobox-docs.component';
import { PlatformComboboxHeaderComponent } from './platform-combobox-header/platform-combobox-header.component';
import { COMBOBOX_MOBILE_CONFIG } from '../../../documentation/utilities/consts';
import { ComboboxStandardComponent } from './examples/combobox-standard/combobox-standard.component';
import { ComboboxMobileExampleComponent } from './examples/combobox-mobile/combobox-mobile-example.component';
import { ComboboxDatasourceExampleComponent } from './examples/combobox-datasource/combobox-datasource-example.component';
import { ComboboxColumnsExampleComponent } from './examples/combobox-columns/combobox-columns-example.component';
import { ComboboxTemplatesExampleComponent } from './examples/combobox-templates/combobox-templates-example.component';
import { ComboboxGroupExampleComponent } from './examples/combobox-group/combobox-group-example.component';
import { ComboboxFormsExampleComponent } from './examples/combobox-forms/combobox-forms-example.component';
import { ComboboxStateComponent } from './examples/combobox-states/combobox-states-example.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { IconModule } from '@fundamental-ngx/core/icon';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';

const routes: Routes = [
    {
        path: '',
        component: PlatformComboboxHeaderComponent,
        children: [
            { path: '', component: PlatformComboboxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.combobox } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformComboboxModule,
        PlatformComboboxMobileModule,
        FdpFormGroupModule,
        IconModule
    ],
    exports: [RouterModule],
    providers: [{ provide: MOBILE_MODE_CONFIG, useValue: COMBOBOX_MOBILE_CONFIG, multi: true }],
    declarations: [
        PlatformComboboxHeaderComponent,
        PlatformComboboxDocsComponent,
        ComboboxStandardComponent,
        ComboboxMobileExampleComponent,
        ComboboxDatasourceExampleComponent,
        ComboboxColumnsExampleComponent,
        ComboboxTemplatesExampleComponent,
        ComboboxGroupExampleComponent,
        ComboboxFormsExampleComponent,
        ComboboxStateComponent
    ]
})
export class PlatformComboboxDocsModule {}
