import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PlatformDocsSplitMenuButtonHeaderComponent } from './platform-split-menu-button-header/platform-split-menu-button-header.component';
import { PlatformDocsSplitMenuButtonComponent } from './platform-split-menu-button.component';
import { PlatformDocsSplitMenuButtonExampleComponent } from './platform-split-menu-button-examples/platform-split-menu-button-examples.component';
import { PlatformDocsSplitMenuButtonOptionsComponent } from './platform-split-menu-button-examples/platform-split-menu-button-options.component';

import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

const routes: Routes = [
    {
        path: '',
        component: PlatformDocsSplitMenuButtonHeaderComponent,
        children: [
            { path: '', component: PlatformDocsSplitMenuButtonComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.splitMenuButton } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, FundamentalNgxPlatformModule],
    exports: [RouterModule],
    declarations: [
        PlatformDocsSplitMenuButtonComponent,
        PlatformDocsSplitMenuButtonHeaderComponent,
        PlatformDocsSplitMenuButtonExampleComponent,
        PlatformDocsSplitMenuButtonOptionsComponent
    ]
})
export class PlatformSplitMenuButtonDocsModule {}
