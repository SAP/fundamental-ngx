import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { IconHeaderComponent } from './icon-header/icon-header.component';
import { IconDocsComponent } from './icon-docs.component';
import { IconExampleComponent } from './examples/icon-example.component';
import { IconModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: IconHeaderComponent,
        children: [
            { path: '', component: IconDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.icon } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, IconModule],
    exports: [RouterModule],
    declarations: [IconDocsComponent, IconHeaderComponent, IconExampleComponent]
})
export class IconDocsModule {}
