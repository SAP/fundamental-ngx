import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { IconHeaderComponent } from './icon-header/icon-header.component';
import { IconDocsComponent } from './icon-docs.component';
import { IconExampleComponent } from './examples/icon-example.component';
import { IconTNTExampleComponent } from './examples/icon-tnt-example.component';
import { IconBusinessSuiteInAppSymbolsExampleComponent } from './examples/icon-businessSuiteInAppSymbols-example.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { IconModule } from '@fundamental-ngx/core/icon';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, IconModule],
    exports: [RouterModule],
    declarations: [
        IconDocsComponent,
        IconHeaderComponent,
        IconExampleComponent,
        IconTNTExampleComponent,
        IconBusinessSuiteInAppSymbolsExampleComponent
    ]
})
export class IconDocsModule {}
