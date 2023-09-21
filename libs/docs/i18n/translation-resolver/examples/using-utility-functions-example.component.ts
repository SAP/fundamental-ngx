import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FD_LANGUAGE,
    FD_LANGUAGE_ENGLISH,
    resolveTranslationObservable,
    resolveTranslationSignal,
    resolveTranslationSync
} from '@fundamental-ngx/i18n';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'fd-translation-resolver-using-utility-functions-example',
    template: `
        <div>
            <span id="translation_resolver_utility_async_descriptor"> Async resolve of the translation </span>
            <br />
            <span aria-describedby="translation_resolver_utility_async_descriptor">
                {{ coreDatePickerDateInputLabel$ | async }}
            </span>
        </div>
        <div>
            <span id="translation_resolver_utility_sync_descriptor"> Sync resolve of the translation </span>
            <br />
            <span aria-describedby="translation_resolver_utility_sync_descriptor">
                {{ coreDatePickerDateInputLabel }}
            </span>
        </div>
        <div>
            <span id="translation_resolver_utility_signal_descriptor"> Signal resolve of the translation </span>
            <br />
            <span aria-describedby="translation_resolver_utility_signal_descriptor">
                {{ coreDatePickerDateInputLabelSignal() }}
            </span>
        </div>

        <div>
            <span id="translation_resolver_utility_async_post_injection_context_descriptor">
                Async resolve of the translation with a function call after injection context
            </span>
            <br />
            <span aria-describedby="translation_resolver_utility_async_post_injection_context_descriptor">
                {{ resolveTranslation$('coreDatePicker.dateInputLabel') | async }}
            </span>
        </div>

        <div>
            <span id="translation_resolver_utility_sync_post_injection_context_descriptor">
                Sync resolve of the translation with a function call after injection context
            </span>
            <br />
            <span aria-describedby="translation_resolver_utility_sync_post_injection_context_descriptor">
                {{ resolveTranslation('coreDatePicker.dateRangeInputLabel') }}
            </span>
        </div>
    `,
    standalone: true,
    imports: [AsyncPipe],
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class UsingUtilityFunctionsExampleComponent {
    /**
     * Async resolve of the translation. It takes FD_LANGUAGE from the DI token and returns an observable.
     */
    coreDatePickerDateInputLabel$ = resolveTranslationObservable('coreDatePicker.dateInputLabel');
    /**
     * Sync resolve of the translation. It takes FD_LANGUAGE from the DI token, subscribes to it
     * and returns a string available at the moment of the function call.
     */
    coreDatePickerDateInputLabel = resolveTranslationSync('coreDatePicker.dateInputLabel');
    /**
     * Using signal to resolve the translation. It takes FD_LANGUAGE from the DI token and returns a
     * computed signal
     */
    coreDatePickerDateInputLabelSignal = resolveTranslationSignal('coreDatePicker.dateInputLabel');

    /**
     * if resolveTranslation$ is called without any parameters, it returns a function,
     * which can be used outside the injection context and will be bound to the current DI FD_LANGUAGE instance
     * and will return an observable of the translation.
     */
    resolveTranslation$ = resolveTranslationObservable();
    /**
     * if resolveTranslation is called without any parameters, it returns a function,
     * which can be used outside the injection context and will be bound to the current DI FD_LANGUAGE instance
     * latest value and will return a string of the translation.
     */
    resolveTranslation = resolveTranslationSync();
}
