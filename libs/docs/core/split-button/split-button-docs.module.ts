import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { ButtonSplitBehaviorsComponent } from './examples/split-button-behaviors-example.component';
import { ButtonSplitTypesIconsComponent } from './examples/split-button-icons-example.component';
import { ButtonSplitOptionsExampleComponent } from './examples/split-button-options-example.component';
import { ButtonSplitProgrammaticalExampleComponent } from './examples/split-button-programmatical-example.component';
import { ButtonSplitTemplateExampleComponent } from './examples/split-button-template-example.component';
import { ButtonSplitTypesExampleComponent } from './examples/split-button-types-example.component';
import { SplitButtonDocsComponent } from './split-button-docs.component';
import { SplitButtonHeaderComponent } from './split-button-header/split-button-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SplitButtonModule,
        SplitButtonDocsComponent,
        SplitButtonHeaderComponent,
        ButtonSplitTypesIconsComponent,
        ButtonSplitTypesExampleComponent,
        ButtonSplitOptionsExampleComponent,
        ButtonSplitTemplateExampleComponent,
        ButtonSplitProgrammaticalExampleComponent,
        ButtonSplitBehaviorsComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('split-button')]
})
export class SplitButtonDocsModule {}
