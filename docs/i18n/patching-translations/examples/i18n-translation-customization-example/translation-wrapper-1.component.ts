import { ChangeDetectionStrategy, Component } from '@angular/core';
import { patchLanguage } from '@fundamental-ngx/i18n';

@Component({
    selector: 'app-translation-wrapper-1',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        patchLanguage({
            // Partially override translations for this component scope
            // Overriding only 3 out of all translation strings for textarea
            // Functions can be used for complex translation logic
            platformTextarea: {
                counterMessageCharactersRemainingSingular: 'You can type 1 more character',
                counterMessageCharactersRemainingPlural: 'You can type {count} more characters',
                counterMessageCharactersOverTheLimitPlural: (params) => {
                    switch (+params.count) {
                        case 2:
                            return 'Two characters over the limit';
                        case 3:
                            return 'Three characters over the limit';
                    }
                    return `${params.count} characters over the limit`;
                }
            }
        })
    ],
    standalone: true
})
export class TranslationWrapper1Component {}
