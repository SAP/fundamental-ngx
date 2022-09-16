import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PlatformObjectStatusModule } from '@fundamental-ngx/platform/object-status';
import { PlatformObjectStatusHeaderComponent } from './platform-object-status-header/platform-object-status-header.component';
import { PlatformObjectStatusDocsComponent } from './platform-object-status-docs.component';
import {
    PlatformObjectStatusExampleComponent,
    PlatformObjectStatusGenericExampleComponent,
    PlatformObjectStatusInvertedGenericTextExampleComponent,
    PlatformObjectStatusInvertedTextExampleComponent,
    PlatformObjectStatusTextExampleComponent,
    PlatformObjectStatusTextIconExampleComponent
} from './examples/platform-object-status-example.component';
import { PlatformObjectStatusClickableAndIconExampleComponent } from './examples/platform-object-status-clickable-and-icon-example.component';
import { PlatformObjectStatusLargeExampleComponent } from './examples/platform-object-status-large-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformObjectStatusHeaderComponent,
        children: [
            { path: '', component: PlatformObjectStatusDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectStatus } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformObjectStatusModule],
    exports: [RouterModule],
    declarations: [
        PlatformObjectStatusDocsComponent,
        PlatformObjectStatusExampleComponent,
        PlatformObjectStatusTextExampleComponent,
        PlatformObjectStatusGenericExampleComponent,
        PlatformObjectStatusTextIconExampleComponent,
        PlatformObjectStatusClickableAndIconExampleComponent,
        PlatformObjectStatusInvertedTextExampleComponent,
        PlatformObjectStatusInvertedGenericTextExampleComponent,
        PlatformObjectStatusLargeExampleComponent,
        PlatformObjectStatusHeaderComponent
    ],
    providers: [currentComponentProvider('object-status')]
})
export class PlatformObjectStatusDocsModule {}
