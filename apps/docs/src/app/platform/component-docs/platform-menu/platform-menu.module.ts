import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PlatformMenuHeaderComponent } from './platform-menu-header/platform-menu-header.component';
import { PlatformMenuDocsComponent } from './platform-menu-docs.component';
import { PlatformMenuBasicExampleComponent } from './platform-menu-examples/platform-menu-basic-example.component';
import { PlatformMenuCascadeExampleComponent } from './platform-menu-examples/platform-menu-cascade-example.component';
import { PlatformMenuScrollingExampleComponent } from './platform-menu-examples/platform-menu-scrolling-example.component';
import { PlatformMenuXPositionExampleComponent } from './platform-menu-examples/platform-menu-x-position-example.component';
import { PlatformMenuModule, PlatformButtonModule, } from '@fundamental-ngx/platform';
import { ImageModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: PlatformMenuHeaderComponent,
        children: [
            { path: '', component: PlatformMenuDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ImageModule,
        SharedDocumentationModule,
        PlatformMenuModule,
        PlatformButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformMenuDocsComponent,
        PlatformMenuHeaderComponent,
        PlatformMenuBasicExampleComponent,
        PlatformMenuCascadeExampleComponent,
        PlatformMenuScrollingExampleComponent,
        PlatformMenuXPositionExampleComponent
    ]
})
export class PlatformMenuDocsModule {}
