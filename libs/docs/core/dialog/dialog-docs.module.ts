import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { DialogDocsHeaderComponent } from './dialog-docs-header/dialog-docs-header.component';
import { DialogDocsComponent } from './dialog-docs.component';
import { examples } from './examples';
import { A11yModule } from '@angular/cdk/a11y';
import { FormModule } from '@fundamental-ngx/core/form';
import { ListModule } from '@fundamental-ngx/core/list';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import {
    DialogInnerPopoverComponent,
    DialogInnerPopoverExampleComponent
} from './examples/dialog-inner-popover/dialog-inner-popover.component';
import { TextModule } from '@fundamental-ngx/core/text';

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
        TextModule
    ],
    exports: [RouterModule],
    declarations: [
        examples,
        DialogDocsComponent,
        DialogDocsHeaderComponent,
        DialogInnerPopoverComponent,
        DialogInnerPopoverExampleComponent
    ],
    providers: [DialogService, currentComponentProvider('dialog')]
})
export class DialogDocsModule {}
