import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { FormMessageHeaderComponent } from './form-message-header/form-message-header.component';
import { FormMessageDocsComponent } from './form-message-docs.component';
import { FormMessageExampleComponent } from './examples/form-message-example.component';
import { FormMessagingStateExampleComponent } from './examples/state-message/form-messaging-state-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';

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
        MultiInputModule
    ],
    exports: [RouterModule],
    declarations: [
        FormMessageDocsComponent,
        FormMessageHeaderComponent,
        FormMessageExampleComponent,
        FormMessagingStateExampleComponent
    ],
    providers: [currentComponentProvider('form-message')]
})
export class FormMessageDocsModule {}
