import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrollSpyModule } from '@fundamental-ngx/core/scroll-spy';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { ScrollSpyCustomExampleComponent } from './examples/scroll-spy-custom-example/scroll-spy-custom-example.component';
import { ScrollSpyOffsetExampleComponent } from './examples/scroll-spy-custom-offset/scroll-spy-offset-example.component';
import { ScrollSpyExampleComponent } from './examples/scroll-spy-example/scroll-spy-example.component';
import { ScrollSpyDocsComponent } from './scroll-spy-docs.component';
import { ScrollSpyHeaderComponent } from './scroll-spy-header/scroll-spy-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ScrollSpyModule,
        ScrollbarModule,
        ScrollSpyDocsComponent,
        ScrollSpyHeaderComponent,
        ScrollSpyExampleComponent,
        ScrollSpyOffsetExampleComponent,
        ScrollSpyCustomExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('scroll-spy')]
})
export class ScrollSpyDocsModules {}
