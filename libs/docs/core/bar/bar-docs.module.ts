import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { TitleModule } from '@fundamental-ngx/core/title';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { BarDocsComponent } from './bar-docs.component';
import { BarHeaderComponent } from './bar-header/bar-header.component';
import { BarCustomShellbarExampleComponent } from './examples/bar-custom-shellbar-example.component';
import { BarDefaultExampleComponent } from './examples/bar-default-example.component';
import { BarHeaderExampleComponent } from './examples/bar-header-example.component';
import { BarPageExampleComponent } from './examples/bar-page-example.component';
import { BarPageResponsiveExampleComponent } from './examples/bar-page-responsive-example.component';
import {
    BarFloatingFooterExampleComponent,
    BarFooterExampleComponent,
    BarHeaderSubHeaderExampleComponent,
    BarSubHeaderExampleComponent
} from './examples/bar-simple-examples.component';
import { BarWithTitleExampleComponent } from './examples/bar-with-title-example.component';

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
        TitleModule,
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
    exports: [RouterModule],
    providers: [currentComponentProvider('bar')]
})
export class BarDocsModule {}
