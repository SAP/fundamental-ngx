import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {IdentifierHeaderComponent} from './identifier-header/identifier-header.component';
import {IdentifierDocsComponent} from './identifier-docs.component';
import {
    CircleIdentifierExampleComponent,
    ColorsIdentifierExampleComponent,
    IconIdentifierExampleComponent,
    InitialsIdentifierExampleComponent,
    TransparentIdentifierExampleComponent
} from './examples/identifier-examples.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule
    ],
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
export class IdentifierDocsModule {
}
