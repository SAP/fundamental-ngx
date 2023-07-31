import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClickedDocsComponent } from './clicked-docs.component';
import { ClickedHeaderComponent } from './clicked-header/clicked-header.component';
import {ApiComponent, currentComponentProvider, SharedDocumentationPageModule} from '@fundamental-ngx/docs/shared';
import { BasicExampleComponent } from './examples/basic-example/basic-example.component';
import { ClickedBehaviorModule, FocusableItemModule } from '@fundamental-ngx/cdk/utils';
import { ProviderExampleComponent } from './examples/provider-example/provider-example.component';
import { UsageWithProviderDirective } from './examples/provider-example/usage-with-provider.directive';
import {API_FILES} from "@fundamental-ngx/docs/cdk/shared";

const routes: Routes = [
    {
        path: '',
        component: ClickedHeaderComponent,
        children: [
            {
                path: '',
                component: ClickedDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.clicked } }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ClickedBehaviorModule,
        FocusableItemModule
    ],
    exports: [RouterModule],
    declarations: [
        ClickedDocsComponent,
        ClickedHeaderComponent,
        BasicExampleComponent,
        ProviderExampleComponent,
        UsageWithProviderDirective
    ],
    providers: [currentComponentProvider('clicked')]
})
export class ClickedDocsModule {}
