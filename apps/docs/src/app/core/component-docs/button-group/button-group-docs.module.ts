import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {API_FILES} from '../../api-files';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {ButtonGroupDocsComponent} from './button-group-docs.component';
import {ButtonGroupHeaderComponent} from './button-group-header/button-group-header.component';
import {ButtonGroupToggleExampleComponent} from './examples/button-group-toggle-example.component';
import {ButtonGroupDefaultExampleComponent} from './examples/button-group-default-example.component';

const routes: Routes = [
    {
        path: '',
        component: ButtonGroupHeaderComponent,
        children: [
            { path: '', component: ButtonGroupDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.buttonGroup } }
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
        ButtonGroupDocsComponent,
        ButtonGroupHeaderComponent,
        ButtonGroupToggleExampleComponent,
        ButtonGroupDefaultExampleComponent,
    ],
})
export class ButtonGroupDocsModule {
}
