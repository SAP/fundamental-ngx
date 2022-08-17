import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import { FdpFormGroupModule, PlatformRadioGroupModule } from '@fundamental-ngx/platform/form';

import { PlatformRadioGroupHeaderComponent } from './platform-radio-group-header/platform-radio-group-header.component';
import { PlatformRadioGroupDocsComponent } from './platform-radio-group-docs.component';
import { PlatformRadioGroupContentExampleComponent } from './platform-radio-group-examples/platform-radio-group-content-examples.component';
import { PlatformRadioGroupDisabledExampleComponent } from './platform-radio-group-examples/platform-radio-group-disabled-examples.component';
import { PlatformRadioGroupListExampleComponent } from './platform-radio-group-examples/platform-radio-group-list-examples.component';
import { PlatformRadioGroupListItemsExampleComponent } from './platform-radio-group-examples/platform-radio-group-list-items-examples.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: PlatformRadioGroupHeaderComponent,
        children: [
            { path: '', component: PlatformRadioGroupDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.radioGroup } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformRadioGroupModule,
        PlatformButtonModule,
        FdpFormGroupModule,
        MessageToastModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformRadioGroupDocsComponent,
        PlatformRadioGroupHeaderComponent,
        PlatformRadioGroupContentExampleComponent,
        PlatformRadioGroupDisabledExampleComponent,
        PlatformRadioGroupListExampleComponent,
        PlatformRadioGroupListItemsExampleComponent
    ],
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-radio-group'),
        platformContentDensityModuleDeprecationsProvider('fdp-radio-button')
    ]
})
export class PlatformRadioGroupDocsModule {}
