import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {API_FILES} from '../../api-files';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {BadgeLabelDocsComponent} from './badge-label-docs.component';
import {
    BadgeDefaultExampleComponent,
    BadgeFilledExampleComponent,
    BadgePillExampleComponent,
    LabelBuildStatusExampleComponent,
    LabelDefaultExampleComponent,
    LabelIconStatusExampleComponent, LabelStatusColorsExampleComponent
} from './examples/badge-label-examples.component';
import {BadgeLabelHeaderComponent} from './badge-label-header/badge-label-header.component';
import { BadgeLabelModule, MessageStripModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: BadgeLabelHeaderComponent,
        children: [
            {path: '', component: BadgeLabelDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.badgeLabel}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        MessageStripModule,
        BadgeLabelModule
    ],
    exports: [RouterModule],
    declarations: [
        BadgeLabelDocsComponent,
        BadgePillExampleComponent,
        BadgeLabelHeaderComponent,
        BadgeFilledExampleComponent,
        BadgeDefaultExampleComponent,
        LabelDefaultExampleComponent,
        LabelIconStatusExampleComponent,
        LabelBuildStatusExampleComponent,
        LabelStatusColorsExampleComponent,
    ],
})
export class BadgeLabelDocsModule {
}
