import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { SegmentedButtonHeaderComponent } from './segmented-button-header/segmented-button-header.component';
import { SegmentedButtonDocsComponent } from './segmented-button-docs.component';
import { examples } from './examples';
import { SegmentedButtonModule } from '@fundamental-ngx/fn/segmented-button';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: SegmentedButtonHeaderComponent,
        children: [
            { path: '', component: SegmentedButtonDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.segmentedButton } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SegmentedButtonModule,
        ButtonModule,
        FormsModule
    ],
    exports: [RouterModule],
    declarations: [examples, SegmentedButtonDocsComponent, SegmentedButtonHeaderComponent],
    providers: [currentComponentProvider('segmented-button')]
})
export class SegmentedButtonDocsModule {}
