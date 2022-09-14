import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { PlatformSliderModule } from '@fundamental-ngx/platform/slider';
import { PlatformDatePickerModule } from '@fundamental-ngx/platform/form';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { TitleModule } from '@fundamental-ngx/core/title';

import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformSmartFilterBarHeaderComponent } from './platform-smart-filter-bar-header/platform-smart-filter-bar-header.component';
import { PlatformSmartFilterBarDocsComponent } from './platform-smart-filter-bar-docs.component';
import { PlatformSmartFilterBarBasicExampleComponent } from './examples/platform-smart-filter-bar-basic-example.component';
import {
    PlatformSmartFilterBarCustomFilterExampleComponent,
    PlatformSmartFilterBarDateRendererComponent,
    PlatformSmartFilterBarSliderComponent
} from './examples/platform-smart-filter-bar-custom-filter-example.component';
import { PlatformSmartFilterBarObservableExampleComponent } from './examples/platform-smart-filter-bar-observable-example.component';
import { PlatformSmartFilterBarCustomLabelsExampleComponent } from './examples/platform-smart-filter-bar-custom-labels-example.component';
import { PlatformSmartFilterBarDynamicPageExampleComponent } from './examples/platform-smart-filter-bar-dynamic-page-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformSmartFilterBarHeaderComponent,
        children: [
            { path: '', component: PlatformSmartFilterBarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.smartFilterBar } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformSmartFilterBar') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformTableModule,
        PlatformButtonModule,
        PlatformSmartFilterBarModule,
        FdDatetimeModule,
        PlatformSliderModule,
        PlatformDatePickerModule,
        DynamicPageModule,
        BreadcrumbModule,
        ToolbarModule,
        BarModule,
        TitleModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformSmartFilterBarDocsComponent,
        PlatformSmartFilterBarHeaderComponent,
        PlatformSmartFilterBarBasicExampleComponent,
        PlatformSmartFilterBarCustomFilterExampleComponent,
        PlatformSmartFilterBarSliderComponent,
        PlatformSmartFilterBarDateRendererComponent,
        PlatformSmartFilterBarObservableExampleComponent,
        PlatformSmartFilterBarCustomLabelsExampleComponent,
        PlatformSmartFilterBarDynamicPageExampleComponent
    ],
    providers: [currentComponentProvider('smart-filter-bar')]
})
export class PlatformSmartFilterBarDocsModule {}
