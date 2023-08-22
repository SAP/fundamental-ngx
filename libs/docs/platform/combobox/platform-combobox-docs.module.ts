import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import { FdpFormGroupModule, PlatformComboboxModule } from '@fundamental-ngx/platform/form';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';

import {
    ApiComponent,
    COMBOBOX_MOBILE_CONFIG,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformComboboxDocsComponent } from './platform-combobox-docs.component';
import { PlatformComboboxHeaderComponent } from './platform-combobox-header/platform-combobox-header.component';
import { ComboboxStandardComponent } from './examples/combobox-standard/combobox-standard.component';
import { ComboboxMobileExampleComponent } from './examples/combobox-mobile/combobox-mobile-example.component';
import { ComboboxDatasourceExampleComponent } from './examples/combobox-datasource/combobox-datasource-example.component';
import { ComboboxColumnsExampleComponent } from './examples/combobox-columns/combobox-columns-example.component';
import { ComboboxTemplatesExampleComponent } from './examples/combobox-templates/combobox-templates-example.component';
import { ComboboxGroupExampleComponent } from './examples/combobox-group/combobox-group-example.component';
import { ComboboxFormsExampleComponent } from './examples/combobox-forms/combobox-forms-example.component';
import { ComboboxStateComponent } from './examples/combobox-states/combobox-states-example.component';
import { ComboboxBylineExampleComponent } from './examples/combobox-byline/combobox-byline-example.component';
import { ComboboxLoadingExampleComponent } from './examples/combobox-loading/combobox-loading-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformComboboxHeaderComponent,
        children: [
            { path: '', component: PlatformComboboxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.combobox } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformCombobox') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformComboboxModule,
        FdpFormGroupModule,
        ListModule,
        BusyIndicatorModule,
        IconModule
    ],
    exports: [RouterModule],
    providers: [
        {
            provide: MOBILE_MODE_CONFIG,
            useValue: COMBOBOX_MOBILE_CONFIG,
            multi: true
        },
        currentComponentProvider('combobox')
    ],
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
        ComboboxStateComponent,
        ComboboxBylineExampleComponent,
        ComboboxLoadingExampleComponent
    ]
})
export class PlatformComboboxDocsModule {}
