import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { I18nModule } from '@fundamental-ngx/i18n';

import { SharedDocumentationPageModule } from '../shared-documentation-page.module';
import { PlatformI18nDocsComponent } from './platform-i18n-docs.component';
import { PlatformI18nHeaderComponent } from './platform-i18n-header/platform-i18n-header.component';
import { PlatformI18nTranslationCustomizationExampleComponent } from './examples/i18n-translation-customization-example/i18n-translation-customization-example.component';
import { TranslationWrapper1Component } from './examples/i18n-translation-customization-example/translation-wrapper-1.component';
import { TranslationWrapper2Component } from './examples/i18n-translation-customization-example/translation-wrapper-2.component';
import { PlatformLanguageChangeExampleComponent } from './examples/i18n-language-change-example/i18n-language-change-example.component';
import { currentComponentProvider } from '../tokens/current-component.token';

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
        SegmentedButtonModule,
        I18nModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformI18nHeaderComponent,
        PlatformI18nDocsComponent,
        PlatformLanguageChangeExampleComponent,
        PlatformI18nTranslationCustomizationExampleComponent,
        TranslationWrapper1Component,
        TranslationWrapper2Component
    ],
    providers: [currentComponentProvider('i18n')]
})
export class PlatformI18nDocsModule {}
