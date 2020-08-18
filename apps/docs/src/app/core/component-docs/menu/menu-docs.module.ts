import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuDocsComponent } from './menu-docs.component';
import {
    MenuAddonExampleComponent,
    MenuExampleComponent,
    MenuMobileExampleComponent,
    MenuSeparatorExampleComponent,
} from './examples/menu-examples.component';

import { MenuMobileModule, MenuModule } from '@fundamental-ngx/core';
import { MenuWithSubmenuExampleComponent } from './examples/menu-with-submenu-example.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

const routes: Routes = [
    {
        path: '',
        component: MenuHeaderComponent,
        children: [
            { path: '', component: MenuDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, MenuModule, MenuMobileModule],
    exports: [RouterModule],
    declarations: [
        MenuDocsComponent,
        MenuHeaderComponent,
        MenuExampleComponent,
        MenuAddonExampleComponent,
        MenuMobileExampleComponent,
        MenuSeparatorExampleComponent,
        MenuWithSubmenuExampleComponent
    ]
})
export class MenuDocsModule {}
