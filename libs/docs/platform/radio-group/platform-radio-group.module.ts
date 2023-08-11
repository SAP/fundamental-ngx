import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import { FdpFormGroupModule, PlatformRadioGroupModule } from '@fundamental-ngx/platform/form';

import { PlatformRadioGroupHeaderComponent } from './platform-radio-group-header/platform-radio-group-header.component';
import { PlatformRadioGroupDocsComponent } from './platform-radio-group-docs.component';
import { PlatformRadioGroupContentExampleComponent } from './examples/platform-radio-group-content-examples.component';
import { PlatformRadioGroupDisabledExampleComponent } from './examples/platform-radio-group-disabled-examples.component';
import { PlatformRadioGroupListExampleComponent } from './examples/platform-radio-group-list-examples.component';
import { PlatformRadioGroupListItemsExampleComponent } from './examples/platform-radio-group-list-items-examples.component';

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
    providers: [currentComponentProvider('radio-group')]
})
export class PlatformRadioGroupDocsModule {}
