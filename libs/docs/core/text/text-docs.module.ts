import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { TextHeaderComponent } from './text-header/text-header.component';
import { TextDocsComponent } from './text-docs.component';
import { TextBasicComponent } from './examples/text-basic.component';
import { TextWhitespacesComponent } from './examples/text-whitespaces.component';
import { TextMaxLinesComponent } from './examples/text-max-lines.component';
import { TextHyphenationComponent } from './examples/text-hyphenation.component';
import { TextExpandableComponent } from './examples/text-expandable.component';
import { TextModule } from '@fundamental-ngx/core/text';
import { FdPatchLanguageDirective } from '@fundamental-ngx/i18n';

const routes: Routes = [
    {
        path: '',
        component: TextHeaderComponent,
        children: [
            { path: '', component: TextDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.text } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, TextModule, FdPatchLanguageDirective],
    exports: [RouterModule],
    declarations: [
        TextDocsComponent,
        TextHeaderComponent,
        TextBasicComponent,
        TextWhitespacesComponent,
        TextMaxLinesComponent,
        TextHyphenationComponent,
        TextExpandableComponent
    ],
    providers: [currentComponentProvider('text')]
})
export class TextDocsModule {}
