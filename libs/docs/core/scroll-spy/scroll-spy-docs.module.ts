import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ScrollSpyCustomExampleComponent } from './examples/scroll-spy-custom-example/scroll-spy-custom-example.component';
import { ScrollSpyOffsetExampleComponent } from './examples/scroll-spy-custom-offset/scroll-spy-offset-example.component';
import { ScrollSpyExampleComponent } from './examples/scroll-spy-example/scroll-spy-example.component';
import { ScrollSpyHeaderComponent } from './scroll-spy-header/scroll-spy-header.component';
import { ScrollSpyDocsComponent } from './scroll-spy-docs.component';
import { ScrollSpyModule } from '@fundamental-ngx/core/scroll-spy';

const routes: Routes = [
    {
        path: '',
        component: ScrollSpyHeaderComponent,
        children: [
            { path: '', component: ScrollSpyDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.scrollSpy } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ScrollSpyModule],
    exports: [RouterModule],
    declarations: [
        ScrollSpyDocsComponent,
        ScrollSpyHeaderComponent,
        ScrollSpyExampleComponent,
        ScrollSpyOffsetExampleComponent,
        ScrollSpyCustomExampleComponent
    ],
    providers: [currentComponentProvider('scroll-spy')]
})
export class ScrollSpyDocsModules {}
