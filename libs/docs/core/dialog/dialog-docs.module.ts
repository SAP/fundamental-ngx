import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule } from '@fundamental-ngx/core/list';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { DialogDocsHeaderComponent } from './dialog-docs-header/dialog-docs-header.component';
import { DialogDocsComponent } from './dialog-docs.component';
import { examples } from './examples';
import {
    DialogInnerPopoverComponent,
    DialogInnerPopoverExampleComponent
} from './examples/dialog-inner-popover/dialog-inner-popover.component';

const routes: Routes = [
    {
        path: '',
        component: DialogDocsHeaderComponent,
        children: [
            { path: '', component: DialogDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dialog } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormModule,
        ListModule,
        DialogModule,
        InputGroupModule,
        A11yModule,
        MultiInputModule,
        CheckboxModule,
        examples,
        DialogDocsComponent,
        DialogDocsHeaderComponent,
        DialogInnerPopoverComponent,
        DialogInnerPopoverExampleComponent
    ],
    exports: [RouterModule],
    providers: [DialogService, currentComponentProvider('dialog')]
})
export class DialogDocsModule {}
