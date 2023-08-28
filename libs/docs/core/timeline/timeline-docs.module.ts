import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { TimelineModule } from '@fundamental-ngx/core/timeline';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { TimelineBasicExampleComponent } from './examples/timeline-basic-example/timeline-basic-example.component';
import { TimelineDocsComponent } from './timeline-docs.component';
import { TimelineHeaderDocsComponent } from './timeline-header-docs/timeline-header-docs.component';

import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { TimelineLoadingExampleComponent } from './examples/loading/timeline-loading-example.component';
import { TimelineHorizontalAxisExampleComponent } from './examples/timeline-horizontal-axis-example.component';
import { TimelineHorizontalDoubleSideExampleComponent } from './examples/timeline-horizontal-double-side-example.component';
import { TimelineVerticalDoubleSideExampleComponent } from './examples/timeline-vertical-double-side-example.component';

const routes: Routes = [
    {
        path: '',
        component: TimelineHeaderDocsComponent,
        children: [
            { path: '', component: TimelineDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.timeline } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        TimelineModule,
        AvatarModule,
        ScrollbarModule,
        TimelineDocsComponent,
        TimelineHeaderDocsComponent,
        TimelineBasicExampleComponent,
        TimelineHorizontalAxisExampleComponent,
        TimelineHorizontalDoubleSideExampleComponent,
        TimelineVerticalDoubleSideExampleComponent,
        TimelineLoadingExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('timeline')]
})
export class TimelineDocsModule {}
