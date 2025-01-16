import { ChangeDetectionStrategy, Component, inject, Inject, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH, FD_LANGUAGE_UKRAINIAN, FD_LOCALE, FdLanguage } from '@fundamental-ngx/i18n';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'fd-language-change-example',
    templateUrl: './language-change-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject(FD_LANGUAGE_ENGLISH)
        },
        {
            provide: FD_LOCALE,
            useFactory: () => new BehaviorSubject(inject(LOCALE_ID))
        }
    ],
    imports: [SegmentedButtonModule, FormsModule, ButtonComponent, FormLabelComponent, PlatformTextAreaModule]
})
export class LanguageChangeExampleComponent {
    fdLocale$ = inject(FD_LOCALE) as BehaviorSubject<string>;
    lang = 'en';

    constructor(@Inject(FD_LANGUAGE) private langSubject$: BehaviorSubject<FdLanguage>) {}

    changeLanguage(lang: 'custom' | 'en' | 'ua'): void {
        switch (lang) {
            case 'en':
                this.langSubject$.next(FD_LANGUAGE_ENGLISH);
                this.fdLocale$.next('en-US');
                break;
            case 'ua':
                this.langSubject$.next(FD_LANGUAGE_UKRAINIAN);
                this.fdLocale$.next('uk-UA');
                break;
            case 'custom': {
                // modify all values of existing English dictionary
                const custom = this.createObjectFromEntries(
                    Object.entries(FD_LANGUAGE_ENGLISH).map(([comp, keys]) => {
                        const modified = Object.entries(keys).map(
                            ([key, value]) => [key, 'Custom: ' + value] as [string, string]
                        );
                        return [comp, this.createObjectFromEntries(modified)];
                    })
                ) as any;
                this.langSubject$.next(custom);
                this.fdLocale$.next('en-US');
                break;
            }
        }
    }

    private createObjectFromEntries(entries: [key: string, value: any][]): Record<string, any> {
        return entries.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    }
}
