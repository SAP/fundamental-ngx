import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { FormMessageExampleComponent } from './examples/form-message-example.component';
import { FormMessagingStateExampleComponent } from './examples/state-message/form-messaging-state-example.component';
import { FormMessageDocsComponent } from './form-message-docs.component';
import { FormMessageHeaderComponent } from './form-message-header/form-message-header.component';

const routes: Routes = [
    {
        path: '',
        component: FormMessageHeaderComponent,
        children: [
            { path: '', component: FormMessageDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormModule,
        PopoverModule,
        InputGroupModule,
        MultiInputModule,
        FormMessageDocsComponent,
        FormMessageHeaderComponent,
        FormMessageExampleComponent,
        FormMessagingStateExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('form-message')]
})
export class FormMessageDocsModule {}
