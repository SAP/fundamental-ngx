import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {LoadingSpinnerHeaderComponent} from './loading-spinner-header/loading-spinner-header.component';
import {LoadingSpinnerDocsComponent} from './loading-spinner-docs.component';
import {LoadingSpinnerExampleComponent} from './examples/loading-spinner-example.component';
import {LoadingSpinnerContainerExampleComponent} from './examples/loading-spinner-container-example.component';
import { LoadingSpinnerModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: LoadingSpinnerHeaderComponent,
        children: [
            {path: '', component: LoadingSpinnerDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.loadingSpinner}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        LoadingSpinnerModule
    ],
    exports: [RouterModule],
    declarations: [
        LoadingSpinnerDocsComponent,
        LoadingSpinnerHeaderComponent,
        LoadingSpinnerExampleComponent,
        LoadingSpinnerContainerExampleComponent
    ]
})
export class LoadingSpinnerDocsModule {
}
