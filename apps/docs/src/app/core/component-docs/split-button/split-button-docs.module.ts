import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { SplitButtonHeaderComponent } from './split-button-header/split-button-header.component';
import { SplitButtonDocsComponent } from './split-button-docs.component';
import { ButtonSplitTypesExampleComponent } from './examples/split-button-types-example.component';
import { ButtonSplitTemplateExampleComponent } from './examples/split-button-template-example.component';
import { ButtonSplitProgrammaticalExampleComponent } from './examples/split-button-programmatical-example.component';
import { ButtonSplitOptionsExampleComponent } from './examples/split-button-options-example.component';
import { ButtonSplitTypesIconsComponent } from './examples/split-button-icons-example.component';
import { ButtonSplitBehaviorsComponent } from './examples/split-button-behaviors-example.component';
import { DeprecatedSplitButtonCompactDirective, SplitButtonModule } from '@fundamental-ngx/core/split-button';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

const routes: Routes = [
    {
        path: '',
        component: SplitButtonHeaderComponent,
        children: [
            { path: '', component: SplitButtonDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.splitButton } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, SplitButtonModule],
    exports: [RouterModule],
    declarations: [
        SplitButtonDocsComponent,
        SplitButtonHeaderComponent,
        ButtonSplitTypesIconsComponent,
        ButtonSplitTypesExampleComponent,
        ButtonSplitOptionsExampleComponent,
        ButtonSplitTemplateExampleComponent,
        ButtonSplitProgrammaticalExampleComponent,
        ButtonSplitBehaviorsComponent
    ],
    providers: [moduleDeprecationsProvider(DeprecatedSplitButtonCompactDirective)]
})
export class SplitButtonDocsModule {}
