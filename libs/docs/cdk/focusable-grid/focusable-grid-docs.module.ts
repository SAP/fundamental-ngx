import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisabledBehaviorModule, FocusableGridModule } from '@fundamental-ngx/cdk/utils';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { ShortRowsExampleComponent } from './examples/short-rows-example/short-rows-example.component';
import { FocusableGridDocsComponent } from './focusable-grid-docs.component';
import { FocusableGridHeaderComponent } from './focusable-grid-header/focusable-grid-header.component';

const routes: Routes = [
    {
        path: '',
        component: FocusableGridHeaderComponent,
        children: [
            {
                path: '',
                component: FocusableGridDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.focusableGrid } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FocusableGridModule,
        DisabledBehaviorModule,
        FocusableGridHeaderComponent,
        FocusableGridDocsComponent,
        DefaultExampleComponent,
        ShortRowsExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('focusable-grid')]
})
export class FocusableGridDocsModule {}
