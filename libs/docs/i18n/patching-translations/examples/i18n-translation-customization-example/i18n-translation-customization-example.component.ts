import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { FdLanguagePatch, FdPatchLanguageDirective } from '@fundamental-ngx/i18n';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { TranslationWrapper1Component } from './translation-wrapper-1.component';
import { TranslationWrapper2Component } from './translation-wrapper-2.component';

@Component({
    selector: 'app-i18n-translation-customization-example',
    templateUrl: './i18n-translation-customization-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormLabelComponent,
        PlatformTextAreaModule,
        FdPatchLanguageDirective,
        TranslationWrapper1Component,
        TranslationWrapper2Component
    ]
})
export class PlatformI18nTranslationCustomizationExampleComponent {
    /** part of the language object to be overriden using `fdPatchLanguage` directive */
    languagePatch: FdLanguagePatch = {
        platformTextarea: {
            // It's possible to partially override some translations for a specific component
            // Here we are overriding three translations. These values can be found in the FdpTextArea documentation
            // The third translation shows an example of more complex translation logic
            counterMessageCharactersOverTheLimitSingular: '1 znak powyżej limitu',
            counterMessageCharactersRemainingSingular: 'Pozostał 1 znak',
            counterMessageCharactersRemainingPlural: (params) => {
                switch (+params.count) {
                    case 10:
                        return 'Pozostało dziesięć znaków';
                    case 9:
                        return 'Pozostało dziewięć znaków';
                    case 8:
                        return 'Pozostało osiem znaków';
                }
                return `Pozostało ${params.count} znaków`;
            }
        }
    };
}
