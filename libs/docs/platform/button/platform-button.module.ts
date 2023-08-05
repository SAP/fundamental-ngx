import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    DeprecatedButtonAriaPressed,
    DeprecatedButtonAriaSelected,
    PlatformButtonModule
} from '@fundamental-ngx/platform/button';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformButtonDocsComponent } from './platform-button-docs.component';
import { PlatformButtonHeaderComponent } from './platform-button-header/platform-button-header.component';
import {
    PlatformButtonIconsExampleComponent,
    PlatformButtonSizesExampleComponent,
    PlatformButtonStateExampleComponent,
    PlatformButtonTruncateExampleComponent,
    PlatformButtonTypesExampleComponent
} from './examples/platform-button-examples.component';

import { moduleDeprecationsProvider } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: PlatformButtonHeaderComponent,
        children: [
            { path: '', component: PlatformButtonDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.button } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformButtonModule],
    exports: [RouterModule],
    declarations: [
        PlatformButtonDocsComponent,
        PlatformButtonHeaderComponent,
        PlatformButtonTypesExampleComponent,
        PlatformButtonSizesExampleComponent,
        PlatformButtonIconsExampleComponent,
        PlatformButtonTruncateExampleComponent,
        PlatformButtonStateExampleComponent
    ],
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-button'),
        moduleDeprecationsProvider(DeprecatedButtonAriaPressed),
        moduleDeprecationsProvider(DeprecatedButtonAriaSelected),
        currentComponentProvider('button')
    ]
})
export class PlatformButtonDocsModule {}
