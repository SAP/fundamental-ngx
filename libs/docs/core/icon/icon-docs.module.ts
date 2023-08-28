import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconModule } from '@fundamental-ngx/core/icon';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { IconBusinessSuiteInAppSymbolsExampleComponent } from './examples/icon-businessSuiteInAppSymbols-example.component';
import { IconExampleComponent } from './examples/icon-example.component';
import { IconTNTExampleComponent } from './examples/icon-tnt-example.component';
import { IconDocsComponent } from './icon-docs.component';
import { IconHeaderComponent } from './icon-header/icon-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        IconModule,
        IconDocsComponent,
        IconHeaderComponent,
        IconExampleComponent,
        IconTNTExampleComponent,
        IconBusinessSuiteInAppSymbolsExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('icon')]
})
export class IconDocsModule {}
