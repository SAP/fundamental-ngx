import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PlatformInfoLabelModule } from '@fundamental-ngx/platform/info-label';
import { PlatformInfoLabelDocsComponent } from './platform-info-label-docs.component';
import { PlatformInfoLabelHeaderComponent } from './platform-info-label-header/platform-info-label-header.component';
import {
    PlatformInfoLabelExampleComponent,
    PlatformInfoLableAriaLabelExampleComponent,
    PlatformInfoLableNumericIconExampleComponent,
    PlatformInfoLableTextExampleComponent,
    PlatformInfoLableTextIconExampleComponent
} from './examples/platform-info-label-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformInfoLabelHeaderComponent,
        children: [
            { path: '', component: PlatformInfoLabelDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.infoLabel } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformInfoLabelModule],
    exports: [RouterModule],
    declarations: [
        PlatformInfoLabelDocsComponent,
        PlatformInfoLabelHeaderComponent,
        PlatformInfoLabelExampleComponent,
        PlatformInfoLableNumericIconExampleComponent,
        PlatformInfoLableTextExampleComponent,
        PlatformInfoLableTextIconExampleComponent,
        PlatformInfoLableAriaLabelExampleComponent
    ],
    providers: [currentComponentProvider('info-label')]
})
export class PlatformInfoLabelDocsModule {}
