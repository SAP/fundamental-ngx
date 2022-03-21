import { ChangeDetectionStrategy, Component } from '@angular/core';
import { patchLanguage } from '@fundamental-ngx/i18n';

@Component({
    selector: 'app-translation-wrapper-1',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        patchLanguage({
            // it's possible to partially override translations for component
            // overriding only 2 out of all translation strings for textarea here
            platformTextarea: {
                counterMessageCharactersRemainingSingular: 'You can type 1 more character',
                counterMessageCharactersRemainingPlural: 'You can type {{ count }} more characters'
            }
        })
    ]
})
export class TranslationWrapper1Component {}
