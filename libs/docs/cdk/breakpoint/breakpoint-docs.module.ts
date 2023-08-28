import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakpointModule } from '@fundamental-ngx/cdk/utils';
import { TableModule } from '@fundamental-ngx/core/table';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { BreakpointDocsComponent } from './breakpoint-docs.component';
import { BreakpointHeaderComponent } from './breakpoint-header/breakpoint-header.component';
import { AliasNamesExampleComponent } from './examples/alias-names-example/alias-names-example.component';
import { BasicExampleComponent } from './examples/basic-example/basic-example.component';
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
        TableModule,
        BreakpointDocsComponent,
        BreakpointHeaderComponent,
        BasicExampleComponent,
        AliasNamesExampleComponent,
        DifferentObserveTargetExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('breakpoint')]
})
export class BreakpointDocsModule {}
