import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';

import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformRadioGroupModule } from '@fundamental-ngx/platform/form';

import { PlatformRadioGroupContentExampleComponent } from './examples/platform-radio-group-content-examples.component';
import { PlatformRadioGroupDisabledExampleComponent } from './examples/platform-radio-group-disabled-examples.component';
import { PlatformRadioGroupListExampleComponent } from './examples/platform-radio-group-list-examples.component';
import { PlatformRadioGroupListItemsExampleComponent } from './examples/platform-radio-group-list-items-examples.component';
import { PlatformRadioGroupDocsComponent } from './platform-radio-group-docs.component';
import { PlatformRadioGroupHeaderComponent } from './platform-radio-group-header/platform-radio-group-header.component';

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
        MessageToastModule,
        PlatformRadioGroupDocsComponent,
        PlatformRadioGroupHeaderComponent,
        PlatformRadioGroupContentExampleComponent,
        PlatformRadioGroupDisabledExampleComponent,
        PlatformRadioGroupListExampleComponent,
        PlatformRadioGroupListItemsExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('radio-group')]
})
export class PlatformRadioGroupDocsModule {}
