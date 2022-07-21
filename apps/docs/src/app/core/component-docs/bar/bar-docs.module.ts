import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { BarDocsComponent } from './bar-docs.component';
import {
    BarFloatingFooterExampleComponent,
    BarFooterExampleComponent,
    BarHeaderSubHeaderExampleComponent,
    BarSubHeaderExampleComponent
} from './examples/bar-simple-examples.component';
import { BarDefaultExampleComponent } from './examples/bar-default-example.component';
import { BarHeaderExampleComponent } from './examples/bar-header-example.component';
import { BarPageExampleComponent } from './examples/bar-page-example.component';
import { BarPageResponsiveExampleComponent } from './examples/bar-page-responsive-example.component';
import { BarHeaderComponent } from './bar-header/bar-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BarWithTitleExampleComponent } from './examples/bar-with-title-example.component';

import { TitleModule } from '@fundamental-ngx/core/title';
import { BarCustomShellbarExampleComponent } from './examples/bar-custom-shellbar-example.component';

const routes: Routes = [
    {
        path: '',
        component: BarHeaderComponent,
        children: [
            { path: '', component: BarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.bar } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AvatarModule,
        SharedDocumentationPageModule,
        BarModule,
        ComboboxModule,
        TitleModule
    ],
    exports: [RouterModule],
    declarations: [
        BarDocsComponent,
        BarHeaderComponent,
        BarDefaultExampleComponent,
        BarHeaderExampleComponent,
        BarSubHeaderExampleComponent,
        BarHeaderSubHeaderExampleComponent,
        BarFooterExampleComponent,
        BarFloatingFooterExampleComponent,
        BarPageExampleComponent,
        BarPageResponsiveExampleComponent,
        BarCustomShellbarExampleComponent,
        BarWithTitleExampleComponent
    ],
    providers: []
})
export class BarDocsModule {}
