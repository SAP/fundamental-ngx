import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BarModule } from '@fundamental-ngx/core/bar';

import { SplitterModule } from '../../../../../../../libs/core/src/lib/splitter';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { API_FILES } from '../../api-files';
import { COMPONENTS } from './examples';
import { SplitterDocsComponent } from './splitter-docs.component';
import { SplitterHeaderComponent } from './splitter-header/splitter-header.component';

const routes: Routes = [
    {
        path: '',
        component: SplitterHeaderComponent,
        children: [
            { path: '', component: SplitterDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.slider } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        SharedDocumentationPageModule,
        SplitterModule,
        BarModule
    ],
    exports: [RouterModule],
    declarations: [SplitterHeaderComponent, SplitterDocsComponent, ...COMPONENTS]
})
export class SplitterDocsModule {}
