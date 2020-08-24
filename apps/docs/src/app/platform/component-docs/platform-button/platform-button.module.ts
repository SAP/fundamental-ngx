import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PlatformButtonHeaderComponent } from './platform-button-header/platform-button-header.component';
import { PlatformButtonDocsComponent } from './platform-button-docs.component';
import { PlatformButtonTypesExampleComponent } from './platform-button-examples/platform-button-examples.component';
import { PlatformButtonSizesExampleComponent } from './platform-button-examples/platform-button-examples.component';
import { PlatformButtonIconsExampleComponent } from './platform-button-examples/platform-button-examples.component';
import { PlatformButtonStateExampleComponent } from './platform-button-examples/platform-button-examples.component';
import { PlatformButtonTruncateExampleComponent } from './platform-button-examples/platform-button-examples.component';
import { PlatformButtonModule } from '@fundamental-ngx/platform';

const routes: Routes = [
    {
        path: '',
        component: PlatformButtonHeaderComponent,
        children: [
            { path: '', component: PlatformButtonDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.button } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        PlatformButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformButtonDocsComponent,
        PlatformButtonHeaderComponent,
        PlatformButtonTypesExampleComponent,
        PlatformButtonSizesExampleComponent,
        PlatformButtonIconsExampleComponent,
        PlatformButtonTruncateExampleComponent,
        PlatformButtonStateExampleComponent
    ]
})
export class PlatformButtonDocsModule { }
