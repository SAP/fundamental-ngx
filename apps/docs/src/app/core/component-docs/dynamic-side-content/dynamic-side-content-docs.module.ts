import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { DynamicSideContentHeaderComponent } from './dynamic-side-content-header/dynamic-side-content-header.component';
import { DynamicSideContentDocsComponent } from './dynamic-side-content-docs.component';
import { DynamicSideContentBasicExampleComponent } from './examples/dynamic-side-content-basic-example.component';
import { DynamicSideContentPositioningExampleComponent } from './examples/dynamic-side-content-positioning-example.component';
import { DynamicSideContentSizeExampleComponent } from './examples/dynamic-side-content-size-example.component';
import { DynamicSideContentModule } from '@fundamental-ngx/core/dynamic-side-content';

const routes: Routes = [
    {
        path: '',
        component: DynamicSideContentHeaderComponent,
        children: [
            { path: '', component: DynamicSideContentDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dynamicSideContent } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, DynamicSideContentModule],
    exports: [RouterModule],
    declarations: [
        DynamicSideContentHeaderComponent,
        DynamicSideContentDocsComponent,
        DynamicSideContentBasicExampleComponent,
        DynamicSideContentPositioningExampleComponent,
        DynamicSideContentSizeExampleComponent
    ]
})
export class DynamicSideContentDocsModule {}
