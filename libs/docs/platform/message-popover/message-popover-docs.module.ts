import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BarModule } from '@fundamental-ngx/core/bar';
import { FormModule } from '@fundamental-ngx/core/form';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import {
    FdpFormGroupModule,
    PlatformFormGeneratorModule,
    PlatformInputModule,
    PlatformSwitchModule,
    PlatformTextAreaModule
} from '@fundamental-ngx/platform/form';
import { MessagePopoverHeaderComponent } from './message-popover-header/message-popover-header.component';
import { MessagePopoverDocsComponent } from './message-popover-docs.component';
import { examples } from './examples';
import { PlatformMessagePopoverModule } from '@fundamental-ngx/platform/message-popover';
import { FormGeneratorComponentExample } from './examples/form-generator/form-generator-component-example.component';
import { FormContainerExampleComponent } from './examples/form-container/form-container-example.component';
import { MessagePopoverCustomConfigExampleComponent } from './examples/custom-config/message-popover-custom-config-example.component';

const routes: Routes = [
    {
        path: '',
        component: MessagePopoverHeaderComponent,
        children: [
            { path: '', component: MessagePopoverDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messagePopover } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformMessagePopoverModule,
        PlatformButtonModule,
        PlatformInputModule,
        FdpFormGroupModule,
        PlatformSwitchModule,
        PlatformTextAreaModule,
        BarModule,
        FormModule,
        PlatformFormGeneratorModule
    ],
    exports: [RouterModule],
    declarations: [
        examples,
        MessagePopoverDocsComponent,
        MessagePopoverHeaderComponent,
        FormGeneratorComponentExample,
        FormContainerExampleComponent,
        MessagePopoverCustomConfigExampleComponent
    ],
    providers: [currentComponentProvider('message-popover')]
})
export class MessagePopoverDocsModule {}
