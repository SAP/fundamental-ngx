import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ListBylineHeaderComponent } from './list-byline-header/list-byline-header.component';
import { ListBylineDocsComponent } from './list-byline-docs.component';
import { CheckboxModule, LinkModule, ListModule, RadioModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { ListBylineSelectionExampleComponent } from './examples/list-byline-selection-example/list-byline-selection-example.component';
import { ListBylineBorderlessExampleComponent } from './examples/list-byline-borderless-example/list-byline-borderless-example.component';
import { ListBylineNavigationExampleComponent } from './examples/list-byline-navigation-example/list-byline-navigation-example.component';
import { ListBylineStandardExampleComponent } from './examples/list-byline-standard-example/list-byline-standard-example.component';
import { ListBylineButtonExampleComponent } from './examples/list-byline-button-example/list-byline-button-example.component';
import { ListBylineInteractiveExampleComponent } from './examples/list-byline-interactive-example/list-byline-interactive-example.component';
import { ListBylineWrapExampleComponent } from './examples/list-byline-wrap-example/list-byline-wrap-example.component';

const routes: Routes = [
    {
        path: '',
        component: ListBylineHeaderComponent,
        children: [
            { path: '', component: ListBylineDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ListModule,
        LinkModule,
        CheckboxModule,
        RadioModule,
        SharedDocumentationModule
    ],
    exports: [RouterModule],
    declarations: [
        ListBylineDocsComponent,
        ListBylineHeaderComponent,
        ListBylineSelectionExampleComponent,
        ListBylineBorderlessExampleComponent,
        ListBylineNavigationExampleComponent,
        ListBylineStandardExampleComponent,
        ListBylineButtonExampleComponent,
        ListBylineInteractiveExampleComponent,
        ListBylineWrapExampleComponent
    ]
})
export class ListDocsModule {}
