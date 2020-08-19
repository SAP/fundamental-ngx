import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { PlatformInfoLabelDocsComponent } from './platform-info-label-docs.component';
import { PlatformInfoLabelHeaderComponent } from './platform-info-label-header/platform-info-label-header.component';
import { API_FILES } from '../../api-files';
import { PlatformInfoLabelExampleComponent,
         PlatformInfoLableNumericIconExampleComponent,
         PlatformInfoLableTextExampleComponent,
         PlatformInfoLableTextIconExampleComponent,
         PlatformInfoLableAriaLabelExampleComponent} from './platform-info-label-example/platform-info-label-example.component';
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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformInfoLabelModule],
    exports: [RouterModule],
    declarations: [
        PlatformInfoLabelDocsComponent,
        PlatformInfoLabelHeaderComponent,
        PlatformInfoLabelExampleComponent,
        PlatformInfoLableNumericIconExampleComponent,
        PlatformInfoLableTextExampleComponent,
        PlatformInfoLableTextIconExampleComponent,
        PlatformInfoLableAriaLabelExampleComponent,
    ]
})
export class PlatformInfoLabelDocsModule {}
