import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {ShellbarDocsHeaderComponent} from './shellbar-docs-header/shellbar-docs-header.component';
import {ShellbarDocsComponent} from './shellbar-docs.component';
import {ShellbarBasicExampleComponent} from './examples/shellbar-basic-example.component';
import {ShellbarSideNavExampleComponent} from './examples/shellbar-side-nav/shellbar-side-nav-example.component';
import {ShellbarAdvancedExampleComponent} from './examples/shellbar-advanced/shellbar-advanced-example.component';
import {ShellbarCollapsibleExampleComponent} from './examples/shellbar-collapsible-example.component';

const routes: Routes = [
    {
        path: '',
        component: ShellbarDocsHeaderComponent,
        children: [
            { path: '', component: ShellbarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.shellbar } }
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
        ShellbarDocsComponent,
        ShellbarDocsHeaderComponent,
        ShellbarBasicExampleComponent,
        ShellbarSideNavExampleComponent,
        ShellbarAdvancedExampleComponent,
        ShellbarCollapsibleExampleComponent
    ]
})
export class ShellbarDocsModule {
}
