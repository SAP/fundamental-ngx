import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from '@fundamental-ngx/core/infinite-scroll';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { InfiniteScrollBasicExampleComponent } from './examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component';
import { InfiniteScrollDocsComponent } from './infinite-scroll-docs.component';
import { InfiniteScrollHeaderComponent } from './infinite-scroll-header/infinite-scroll-header.component';

const routes: Routes = [
    {
        path: '',
        component: InfiniteScrollHeaderComponent,
        children: [
            { path: '', component: InfiniteScrollDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.infiniteScroll } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        InfiniteScrollModule,
        InfiniteScrollDocsComponent,
        InfiniteScrollHeaderComponent,
        InfiniteScrollBasicExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('infinite-scroll')]
})
export class InfiniteScrollDocsModule {}
