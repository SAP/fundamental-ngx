import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ScrollbarHeaderComponent } from './scrollbar-header/scrollbar-header.component';
import { ScrollbarDocsComponent } from './scrollbar-docs.component';

import { ScrollbarExampleComponent } from './examples/scrollbar-example.component';
import { ScrollbarNoHorizontalExampleComponent } from './examples/scrollbar-no-horizontal-example.component';
import { ScrollbarNoVerticalExampleComponent } from './examples/scrollbar-no-vertical-example.component';

const routes: Routes = [
    {
        path: '',
        component: ScrollbarHeaderComponent,
        children: [
            { path: '', component: ScrollbarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.scrollbar } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ScrollbarModule],
    exports: [RouterModule],
    declarations: [
        ScrollbarDocsComponent,
        ScrollbarHeaderComponent,
        ScrollbarExampleComponent,
        ScrollbarNoHorizontalExampleComponent,
        ScrollbarNoVerticalExampleComponent
    ]
})
export class ScrollbarDocsModule {}
