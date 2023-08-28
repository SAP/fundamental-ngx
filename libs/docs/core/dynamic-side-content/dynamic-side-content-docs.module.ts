import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { DynamicSideContentModule } from '@fundamental-ngx/core/dynamic-side-content';
import { DynamicSideContentDocsComponent } from './dynamic-side-content-docs.component';
import { DynamicSideContentHeaderComponent } from './dynamic-side-content-header/dynamic-side-content-header.component';
import { DynamicSideContentBasicExampleComponent } from './examples/dynamic-side-content-basic-example.component';
import { DynamicSideContentPositioningExampleComponent } from './examples/dynamic-side-content-positioning-example.component';
import { DynamicSideContentSizeExampleComponent } from './examples/dynamic-side-content-size-example.component';

const routes: Routes = [
    {
        path: '',
        component: DynamicSideContentHeaderComponent,
        children: [
            { path: '', component: DynamicSideContentDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dynamicSideContent } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        DynamicSideContentModule,
        DynamicSideContentHeaderComponent,
        DynamicSideContentDocsComponent,
        DynamicSideContentBasicExampleComponent,
        DynamicSideContentPositioningExampleComponent,
        DynamicSideContentSizeExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('dynamic-side-content')]
})
export class DynamicSideContentDocsModule {}
