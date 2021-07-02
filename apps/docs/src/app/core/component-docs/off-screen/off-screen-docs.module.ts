import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { OffScreenHeaderComponent } from './off-screen-header/off-screen-header.component';
import { OffScreenDocsComponent } from './off-screen-docs.component';
import { OffScreenExampleComponent } from './examples/off-screen-example.component';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { OffScreenElementModule } from '@fundamental-ngx/core/utils';

const routes: Routes = [
    {
        path: '',
        component: OffScreenHeaderComponent,
        children: [
            { path: '', component: OffScreenDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.offScreen } }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ButtonModule, OffScreenElementModule],
    exports: [RouterModule],
    declarations: [OffScreenHeaderComponent, OffScreenDocsComponent, OffScreenExampleComponent]
})
export class OffScreenDocsModule {}
