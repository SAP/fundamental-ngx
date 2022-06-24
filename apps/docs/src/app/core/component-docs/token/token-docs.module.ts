import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TokenHeaderComponent } from './token-header/token-header.component';
import { TokenDocsComponent } from './token-docs.component';
import { TokenExampleComponent } from './examples/token-example/token-example.component';
import { TokenizerExampleComponent } from './examples/tokenizer-example/tokenizer-example.component';
import { TokenCompactExampleComponent } from './examples/token-compact-example/token-compact-example.component';
import { TokenSelectedExampleComponent } from './examples/token-selected-example/token-selected-example.component';
import { TokenReadOnlyExampleComponent } from './examples/token-readonly-example/token-readonly-example.component';
import { TokenizerCompactExampleComponent } from './examples/tokenizer-compact-example/tokenizer-compact-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { DeprecatedTokenizerContentDensityDirective, TokenModule } from '@fundamental-ngx/core/token';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
    imports: [FormModule, TokenModule, RouterModule.forChild(routes), SharedDocumentationPageModule],
    exports: [RouterModule],
    declarations: [
        TokenDocsComponent,
        TokenHeaderComponent,
        TokenExampleComponent,
        TokenizerExampleComponent,
        TokenCompactExampleComponent,
        TokenSelectedExampleComponent,
        TokenReadOnlyExampleComponent,
        TokenizerCompactExampleComponent
    ],
    providers: [moduleDeprecationsProvider(DeprecatedTokenizerContentDensityDirective)]
})
export class TokenDocsModule {}
