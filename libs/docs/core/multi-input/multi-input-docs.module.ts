import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { MultiInputHeaderComponent } from './multi-input-header/multi-input-header.component';
import { MultiInputDocsComponent } from './multi-input-docs.component';
import { MultiInputAsyncExampleComponent } from './examples/multi-input-async-example/multi-input-async-example.component';
import { MultiInputDisplaywithExampleComponent } from './examples/multi-input-displaywith-example/multi-input-displaywith-example.component';
import { MultiInputExampleComponent } from './examples/multi-input-example/multi-input-example.component';
import { MultiInputFilterExampleComponent } from './examples/multi-input-filter-example/multi-input-filter-example.component';
import { MultiInputFormExampleComponent } from './examples/multi-input-form-example/multi-input-form-example.component';
import { MultiInputCompactExampleComponent } from './examples/multi-input-compact-example/multi-input-compact-example.component';
import { MultiInputNewTokensExampleComponent } from './examples/multi-input-new-tokens-example/multi-input-new-tokens-example.component';
import { MultiInputMobileExampleComponent } from './examples/multi-input-mobile-example/multi-input-mobile-example.component';
import { MultiInputIncludesExampleComponent } from './examples/multi-input-includes-example/multi-input-includes-example.component';
import { MultiInputCustomItemExampleComponent } from './examples/multi-input-custom-item-example/multi-input-custom-item-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { DeprecatedMultiInputCompactDirective, MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { MultiInputDropdownWidthExampleComponent } from './examples/multi-input-dropdown-width-example/multi-input-dropdown-width-example.component';

const routes: Routes = [
    {
        path: '',
        component: MultiInputHeaderComponent,
        children: [
            { path: '', component: MultiInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiInput } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormModule,
        MultiInputModule,
        ListModule,
        IconModule
    ],
    exports: [RouterModule],
    declarations: [
        MultiInputDocsComponent,
        MultiInputHeaderComponent,
        MultiInputExampleComponent,
        MultiInputFormExampleComponent,
        MultiInputAsyncExampleComponent,
        MultiInputFilterExampleComponent,
        MultiInputDisplaywithExampleComponent,
        MultiInputCompactExampleComponent,
        MultiInputNewTokensExampleComponent,
        MultiInputMobileExampleComponent,
        MultiInputIncludesExampleComponent,
        MultiInputCustomItemExampleComponent,
        MultiInputDropdownWidthExampleComponent
    ],
    providers: [
        moduleDeprecationsProvider(DeprecatedMultiInputCompactDirective),
        currentComponentProvider('multi-input')
    ]
})
export class MultiInputDocsModule {}
