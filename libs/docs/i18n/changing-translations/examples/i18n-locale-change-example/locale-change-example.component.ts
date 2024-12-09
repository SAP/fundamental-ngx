import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { FD_LOCALE, FdLanguage, resolveTranslationSignalFn } from '@fundamental-ngx/i18n';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'fd-locale-change-example',
    templateUrl: './locale-change-example.component.html',
    imports: [ButtonComponent, SegmentedButtonComponent, FormsModule, AsyncPipe, FormControlComponent],
    providers: [
        {
            provide: FD_LOCALE,
            useFactory: () => new BehaviorSubject(inject(LOCALE_ID))
        }
    ]
})
export class LocaleChangeExampleComponent {
    translationResolver = resolveTranslationSignalFn({
        fdLang: {
            pluralizationExample:
                'translated "{count}" as "{count, plural, =0 {ZERO} one {ONE} few {FEW} other {MANY}}"'
        } as unknown as FdLanguage
    });
    locale$ = inject(FD_LOCALE) as BehaviorSubject<string>;
    initialLocaleValue = this.locale$.value;
    locale = this.initialLocaleValue;
    count = signal(0);
    pluralizationContext = computed(() => ({ count: this.count() }));
    pluralizationExample = this.translationResolver('pluralizationExample' as any, this.pluralizationContext);

    changeLocale($event: string): void {
        this.locale$.next($event);
    }
}
