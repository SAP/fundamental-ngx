import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { ProductSwitchDndExampleComponent } from './examples/product-switch-dnd-example.component';
import { ProductSwitchListComponent } from './examples/product-switch-list/product-switch-list-example.component';
import { ProductSwitchSmallExampleComponent } from './examples/product-switch-small-example.component';
import { ProductSwitchDocsHeaderComponent } from './product-switch-docs-header/product-switch-docs-header.component';
import { ProductSwitchDocsComponent } from './product-switch-docs.component';

const routes: Routes = [
    {
        path: '',
        component: ProductSwitchDocsHeaderComponent,
        children: [
            { path: '', component: ProductSwitchDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.productSwitch } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ProductSwitchModule,
        ShellbarModule,
        ProductSwitchDocsComponent,
        ProductSwitchListComponent,
        ProductSwitchDocsHeaderComponent,
        ProductSwitchDndExampleComponent,
        ProductSwitchSmallExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('product-switch')]
})
export class ProductSwitchDocsModule {}
