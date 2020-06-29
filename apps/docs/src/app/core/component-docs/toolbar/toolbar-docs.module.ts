import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ToolbarModule, ButtonModule, ToolbarSeparatorComponent } from '@fundamental-ngx/core';

import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { ToolbarDocsComponent } from './toolbar-docs.component';
import { ToolbarHeaderComponent } from './toolbar-header/toolbar-header.component';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import {
    ToolbarTypeExampleComponent,
    ToolbarTitleExampleComponent,
    ToolbarSpacerExampleComponent,
    ToolbarSeparatorExampleComponent,
    ToolbarOverflowExampleComponent,
    ToolbarSizeExampleComponent
} from './examples/toolbar-example.component';

const examples = [
    ToolbarTypeExampleComponent,
    ToolbarTitleExampleComponent,
    ToolbarSpacerExampleComponent,
    ToolbarSeparatorExampleComponent,
    ToolbarOverflowExampleComponent,
    ToolbarSizeExampleComponent
];

const routes: Routes = [
    {
        path: '',
        component: ToolbarHeaderComponent,
        children: [
            { path: '', component: ToolbarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.toolbar } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, ToolbarModule, ButtonModule],
    exports: [RouterModule],
    declarations: [ToolbarDocsComponent, ToolbarHeaderComponent, ...examples]
})
export class ToolbarDocsModule {}
