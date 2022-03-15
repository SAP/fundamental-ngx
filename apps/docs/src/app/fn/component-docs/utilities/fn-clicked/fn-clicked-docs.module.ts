import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FnClickedDocsComponent } from './fn-clicked-docs.component';
import { FnClickedHeaderComponent } from './fn-clicked-header/fn-clicked-header.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { BasicExampleComponent } from './examples/basic-example/basic-example.component';
import { ClickedBehaviorModule, FocusableItemModule } from '@fundamental-ngx/fn/cdk';
import { ProviderExampleComponent } from './examples/provider-example/provider-example.component';
import { UsageWithProviderDirective } from './examples/provider-example/usage-with-provider.directive';

const routes: Routes = [
    {
        path: '',
        component: FnClickedHeaderComponent,
        children: [
            {
                path: '',
                component: FnClickedDocsComponent
            }
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
        FnClickedDocsComponent,
        FnClickedHeaderComponent,
        BasicExampleComponent,
        ProviderExampleComponent,
        UsageWithProviderDirective
    ]
})
export class FnClickedDocsModule {}
