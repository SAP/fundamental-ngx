import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PlatformSelectHeaderComponent } from './platform-select-header/platform-select-header.component';
import { PlatformSelectDocsComponent } from './platform-select-docs.component';
import { PlatformSelectTypesDefaultExampleComponent } from './platform-select-examples/platform-select-types-default-example.component';
import { PlatformSelectTypesNoBorderExampleComponent } from './platform-select-examples/platform-select-types-noborder-example.component';
import { PlatformSelectTypesSplitExampleComponent } from './platform-select-examples/platform-select-types-split-example.component';
import { PlatformSelectTypesWithIconExampleComponent } from './platform-select-examples/platform-select-types-with-icon-example.component';
import { PlatformSelectModule } from '@fundamental-ngx/platform';

const routes: Routes = [
    {
        path: '',
        component: PlatformSelectHeaderComponent,
        children: [
            { path: '', component: PlatformSelectDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.select } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PlatformSelectModule],
    exports: [RouterModule],
    declarations: [
        PlatformSelectDocsComponent,
        PlatformSelectHeaderComponent,
        PlatformSelectTypesDefaultExampleComponent,
        PlatformSelectTypesNoBorderExampleComponent,
        PlatformSelectTypesSplitExampleComponent,
        PlatformSelectTypesWithIconExampleComponent
    ]
})
export class PlatformSelectDocsModule {}
