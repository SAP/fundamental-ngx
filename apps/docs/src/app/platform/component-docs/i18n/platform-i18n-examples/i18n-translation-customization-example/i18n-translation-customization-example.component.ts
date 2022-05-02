import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FdLanguagePatch } from '@fundamental-ngx/i18n';

@Component({
    selector: 'app-i18n-translation-customization-example',
    templateUrl: './i18n-translation-customization-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformI18nTranslationCustomizationExampleComponent {
    /** part of the language object to be overriden using `fdPatchLanguage` directive */
    languagePatch: FdLanguagePatch = {
        platformTextarea: {
            // it's possible to partially override translations for component
            // overriding only 3 out of all translation strings for textarea here
            // also function can be used to provide complex translation logic
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
