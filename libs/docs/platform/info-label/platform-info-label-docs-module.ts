import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PlatformInfoLabelModule } from '@fundamental-ngx/platform/info-label';
import {
    PlatformInfoLabelExampleComponent,
    PlatformInfoLableAriaLabelExampleComponent,
    PlatformInfoLableNumericIconExampleComponent,
    PlatformInfoLableTextExampleComponent,
    PlatformInfoLableTextIconExampleComponent
} from './examples/platform-info-label-example.component';
import { PlatformInfoLabelDocsComponent } from './platform-info-label-docs.component';
import { PlatformInfoLabelHeaderComponent } from './platform-info-label-header/platform-info-label-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformInfoLabelModule,
        PlatformInfoLabelDocsComponent,
        PlatformInfoLabelHeaderComponent,
        PlatformInfoLabelExampleComponent,
        PlatformInfoLableNumericIconExampleComponent,
        PlatformInfoLableTextExampleComponent,
        PlatformInfoLableTextIconExampleComponent,
        PlatformInfoLableAriaLabelExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('info-label')]
})
export class PlatformInfoLabelDocsModule {}
