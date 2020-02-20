import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {NotificationDocsHeaderComponent} from './notification-docs-header/notification-docs-header.component';
import {NotificationDocsComponent} from './notification-docs.component';
import {NotificationComponentAsContentExampleComponent} from './examples/component-as-content/notification-component-as-content-example.component';
import {NotificationContentComponent} from './examples/component-as-content/notification-content.component';
import {NotificationGroupTemplateExampleComponent} from './examples/group-notification/notification-group-template-example.component';
import {NotificationOptionsContentComponent} from './examples/notification-options/notification-options-content.component';
import {NotificationOptionsExampleComponent} from './examples/notification-options/notification-options-example.component';
import {NotificationOpenTemplateExampleComponent} from './examples/template-as-content/notification-open-template-example.component';
import {NotificationAsObjectExampleComponent} from './examples/notification-as-object.component';

const routes: Routes = [
    {
        path: '',
        component: NotificationDocsHeaderComponent,
        children: [
            {path: '', component: NotificationDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.multiInput}}
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
        NotificationDocsComponent,
        NotificationContentComponent,
        NotificationDocsHeaderComponent,
        NotificationOptionsExampleComponent,
        NotificationOptionsContentComponent,
        NotificationAsObjectExampleComponent,
        NotificationOpenTemplateExampleComponent,
        NotificationGroupTemplateExampleComponent,
        NotificationComponentAsContentExampleComponent,
    ],
    entryComponents: [
        NotificationContentComponent,
        NotificationOptionsContentComponent
    ]
})
export class NotificationDocsModule {
}
