import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { IdentifierHeaderComponent } from './identifier-header/identifier-header.component';
import { IdentifierDocsComponent } from './identifier-docs.component';
import {
    CircleIdentifierExampleComponent,
    ColorsIdentifierExampleComponent,
    IconIdentifierExampleComponent,
    InitialsIdentifierExampleComponent,
    TransparentIdentifierExampleComponent
} from './examples/identifier-examples.component';
import { IdentifierModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

const routes: Routes = [
    {
        path: '',
        component: IdentifierHeaderComponent,
        children: [
            { path: '', component: IdentifierDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.identifier } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, IdentifierModule],
    exports: [RouterModule],
    declarations: [
        IdentifierDocsComponent,
        IdentifierHeaderComponent,
        IconIdentifierExampleComponent,
        CircleIdentifierExampleComponent,
        ColorsIdentifierExampleComponent,
        InitialsIdentifierExampleComponent,
        TransparentIdentifierExampleComponent
    ]
})
export class IdentifierDocsModule {}
