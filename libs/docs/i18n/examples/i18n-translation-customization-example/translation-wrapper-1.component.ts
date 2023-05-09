import { ChangeDetectionStrategy, Component } from '@angular/core';
import { patchLanguage } from '@fundamental-ngx/i18n';

@Component({
    selector: 'app-translation-wrapper-1',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        patchLanguage({
            // it's possible to partially override translations for component
            // overriding only 3 out of all translation strings for textarea here
            // also function can be used to provide complex translation logic
            platformTextarea: {
                counterMessageCharactersRemainingSingular: 'You can type 1 more character',
                counterMessageCharactersRemainingPlural: 'You can type {{ count }} more characters',
                counterMessageCharactersOverTheLimitPlural: (params) => {
                    switch (+params.count) {
                        case 2:
                            return 'Two charactes over the limit';
                        case 3:
                            return 'Three charactes over the limit';
                    }
                    return `${params.count} characters over the limit`;
                }
            }
        })
    ]
})
export class TranslationWrapper1Component {}
