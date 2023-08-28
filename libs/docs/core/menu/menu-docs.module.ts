import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import {
    MenuAddonExampleComponent,
    MenuExampleComponent,
    MenuSeparatorExampleComponent
} from './examples/menu-examples.component';
import { MenuDocsComponent } from './menu-docs.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';

import { MenuModule } from '@fundamental-ngx/core/menu';
import { MenuMobileExampleComponent } from './examples/menu-mobile-example.component';
import { MenuScrollbarExampleComponent } from './examples/menu-scrollbar-example.component';
import { MenuWithSubmenuExampleComponent } from './examples/menu-with-submenu-example.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        MenuModule,
        MenuDocsComponent,
        MenuHeaderComponent,
        MenuExampleComponent,
        MenuAddonExampleComponent,
        MenuMobileExampleComponent,
        MenuSeparatorExampleComponent,
        MenuWithSubmenuExampleComponent,
        MenuScrollbarExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('menu')]
})
export class MenuDocsModule {}
