import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormModule } from '@fundamental-ngx/core/form';
import { TokenModule } from '@fundamental-ngx/core/token';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { FdPatchLanguageDirective } from '@fundamental-ngx/i18n';
import { TokenCompactExampleComponent } from './examples/token-compact-example/token-compact-example.component';
import { TokenExampleComponent } from './examples/token-example/token-example.component';
import { TokenReadOnlyExampleComponent } from './examples/token-readonly-example/token-readonly-example.component';
import { TokenSelectedExampleComponent } from './examples/token-selected-example/token-selected-example.component';
import { TokenizerCompactExampleComponent } from './examples/tokenizer-compact-example/tokenizer-compact-example.component';
import { TokenizerExampleComponent } from './examples/tokenizer-example/tokenizer-example.component';
import { TokenDocsComponent } from './token-docs.component';
import { TokenHeaderComponent } from './token-header/token-header.component';

const routes: Routes = [
    {
        path: '',
        component: TokenHeaderComponent,
        children: [
            { path: '', component: TokenDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.token } }
        ]
    }
];

@NgModule({
    imports: [
        FormModule,
        TokenModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FdPatchLanguageDirective,
        TokenDocsComponent,
        TokenHeaderComponent,
        TokenExampleComponent,
        TokenizerExampleComponent,
        TokenCompactExampleComponent,
        TokenSelectedExampleComponent,
        TokenReadOnlyExampleComponent,
        TokenizerCompactExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('token')]
})
export class TokenDocsModule {}
