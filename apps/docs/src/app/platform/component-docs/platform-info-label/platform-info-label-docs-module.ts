import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { PlatformInfoLabelDocsComponent } from './platform-info-label-docs.component';
import { PlatformInfoLabelHeaderComponent } from './platform-info-label-header/platform-info-label-header.component';
import { API_FILES } from '../../api-files';
import { PlatformInfoLabelExampleComponent, 
         PlatformInfoLableNumericIconExampleComponent, 
         PlatformInfoLableTextExampleComponent, 
         PlatformInfoLableTextIconExampleComponent } from './platform-info-label-example/platform-info-label-example.component';
import { PlatformInfoLabelModule } from '@fundamental-ngx/platform';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PlatformInfoLabelModule],
    exports: [RouterModule],
    declarations: [
        PlatformInfoLabelDocsComponent,
        PlatformInfoLabelHeaderComponent,
        PlatformInfoLabelExampleComponent,
        PlatformInfoLableNumericIconExampleComponent,
        PlatformInfoLableTextExampleComponent,
        PlatformInfoLableTextIconExampleComponent,
    ]
})
export class PlatformInfoLabelDocsModule {}