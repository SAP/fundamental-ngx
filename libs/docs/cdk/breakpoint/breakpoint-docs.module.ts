import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreakpointDocsComponent } from './breakpoint-docs.component';
import { BreakpointHeaderComponent } from './breakpoint-header/breakpoint-header.component';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { BasicExampleComponent } from './examples/basic-example/basic-example.component';
import { BreakpointModule } from '@fundamental-ngx/cdk/utils';
import { AliasNamesExampleComponent } from './examples/alias-names-example/alias-names-example.component';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { TableModule } from '@fundamental-ngx/core/table';
import { DifferentObserveTargetExampleComponent } from './examples/different-observe-target-example.component';

const routes: Routes = [
    {
        path: '',
        component: BreakpointHeaderComponent,
        children: [
            {
                path: '',
                component: BreakpointDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.breakpoint } }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        BreakpointModule,
        TableModule
    ],
    exports: [RouterModule],
    declarations: [
        BreakpointDocsComponent,
        BreakpointHeaderComponent,
        BasicExampleComponent,
        AliasNamesExampleComponent,
        DifferentObserveTargetExampleComponent
    ],
    providers: [currentComponentProvider('breakpoint')]
})
export class BreakpointDocsModule {}
