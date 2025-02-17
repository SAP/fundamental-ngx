import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH, TranslationResolver } from '@fundamental-ngx/i18n';
import { BehaviorSubject, map } from 'rxjs';

@Component({
    selector: 'fd-translation-resolver-basic-usage-example',
    template: `
        <div>
            <span id="translation_resolver_async_descriptor"> Async resolve of the translation </span>
            <br />
            <span aria-describedby="translation_resolver_async_descriptor">
                {{ coreDatePickerDateInputLabel$ | async }}
            </span>
        </div>
        <div>
            <span id="translation_resolver_sync_descriptor"> Sync resolve of the translation </span>
            <br />
            <span aria-describedby="translation_resolver_sync_descriptor">
                {{ coreDatePickerDateInputLabel }}
            </span>
        </div>
    `,
    imports: [AsyncPipe],
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class BasicUsageExampleComponent {
    lang$ = inject(FD_LANGUAGE);
    translationResolver = new TranslationResolver();
    coreDatePickerDateInputLabel$ = this.lang$.pipe(
        map((lang) => this.translationResolver.resolve(lang, 'coreDatePicker.dateInputLabel'))
    );
    coreDatePickerDateInputLabel = this.translationResolver.resolve(
        FD_LANGUAGE_ENGLISH,
        'coreDatePicker.dateInputLabel'
    );
}
