import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {ProductSwitchSmallExampleComponent} from './examples/product-switch-small-example.component';
import {ProductSwitchDndExampleComponent} from './examples/product-switch-dnd-example.component';
import {ProductSwitchDocsHeaderComponent} from './product-switch-docs-header/product-switch-docs-header.component';
import {ProductSwitchListComponent} from './examples/product-switch-list/product-switch-list-example.component';
import {ProductSwitchDocsComponent} from './product-switch-docs.component';

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
        SharedDocumentationModule
    ],
    exports: [RouterModule],
    declarations: [
        ProductSwitchDocsComponent,
        ProductSwitchListComponent,
        ProductSwitchDocsHeaderComponent,
        ProductSwitchDndExampleComponent,
        ProductSwitchSmallExampleComponent
    ]
})
export class ProductSwitchDocsModule {
}
