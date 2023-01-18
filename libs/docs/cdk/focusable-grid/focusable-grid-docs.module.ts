import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { FocusableGridDocsComponent } from './focusable-grid-docs.component';
import { FocusableGridHeaderComponent } from './focusable-grid-header/focusable-grid-header.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { DisabledBehaviorModule, FocusableGridModule } from '@fundamental-ngx/cdk/utils';
import { ShortRowsExampleComponent } from './examples/short-rows-example/short-rows-example.component';

const routes: Routes = [
    {
        path: '',
        component: FocusableGridHeaderComponent,
        children: [
            {
                path: '',
                component: FocusableGridDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FocusableGridModule,
        DisabledBehaviorModule
    ],
    exports: [RouterModule],
    declarations: [
        FocusableGridHeaderComponent,
        FocusableGridDocsComponent,
        DefaultExampleComponent,
        ShortRowsExampleComponent
    ],
    providers: [currentComponentProvider('focusable-grid')]
})
export class FocusableGridDocsModule {}
