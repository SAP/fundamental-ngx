import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { PlatformI18nDocsComponent } from './platform-i18n-docs.component';
import { PlatformI18nHeaderComponent } from './platform-i18n-header/platform-i18n-header.component';
import { PlatformI18nTranslationCustomizationExampleComponent } from './platform-i18n-examples/i18n-translation-customization-example/i18n-translation-customization-example.component';
import { TranslationWrapper1Component } from './platform-i18n-examples/i18n-translation-customization-example/translation-wrapper-1.component';
import { TranslationWrapper2Component } from './platform-i18n-examples/i18n-translation-customization-example/translation-wrapper-2.component';
import { PlatformLanguageChangeExampleComponent } from './platform-i18n-examples/i18n-language-change-example/i18n-language-change-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformI18nHeaderComponent,
        children: [{ path: '', component: PlatformI18nDocsComponent }]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformTextAreaModule,
        SegmentedButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformI18nHeaderComponent,
        PlatformI18nDocsComponent,
        PlatformLanguageChangeExampleComponent,
        PlatformI18nTranslationCustomizationExampleComponent,
        TranslationWrapper1Component,
        TranslationWrapper2Component
    ]
})
export class PlatformI18nDocsModule {}
