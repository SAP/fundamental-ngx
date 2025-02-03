import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FD_LANGUAGE,
    FD_LANGUAGE_ENGLISH,
    resolveTranslationObservable,
    resolveTranslationObservableFn,
    resolveTranslationSignal,
    resolveTranslationSignalFn,
    resolveTranslationSync,
    resolveTranslationSyncFn
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
                {{ dateInputLabelObservable | async }}
            </span>
        </div>

        <div>
            <span id="translation_resolver_utility_sync_post_injection_context_descriptor">
                Sync resolve of the translation with a function call after injection context
            </span>
            <br />
            <span aria-describedby="translation_resolver_utility_sync_post_injection_context_descriptor">
                {{ dateRangeInputLabelSync }}
            </span>
        </div>

        <div>
            <span id="translation_resolver_utility_signal_post_injection_context_descriptor">
                signal resolve of the translation with a function call after injection context
            </span>
            <br />
            <span aria-describedby="translation_resolver_utility_signal_post_injection_context_descriptor">
                {{ dateRangeInputLabelSignal() }}
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
export class UsingUtilityFunctionsExampleComponent {
    /**
     * Async resolve of the translation
     */
    coreDatePickerDateInputLabel$ = resolveTranslationObservable('coreDatePicker.dateInputLabel');
    /**
     * Sync resolve of the translation
     */

    coreDatePickerDateInputLabel = resolveTranslationSync('coreDatePicker.dateInputLabel');

    /**
     * Using signal to resolve the translation
     */
    coreDatePickerDateInputLabelSignal = resolveTranslationSignal('coreDatePicker.dateInputLabel');

    /**
     * You can also call a factory function to get the observable resolver
     */
    translationObservableResolver = resolveTranslationObservableFn();

    /**
     * You can also call a factory function to get the sync resolver,
     * with this, you can use the resolver later on, without the need to
     * call it in injection context
     */
    translationSyncResolver = resolveTranslationSyncFn();

    /**
     * You can also call a factory function to get the signal resolver
     */
    translationSignalResolver = resolveTranslationSignalFn();

    dateInputLabelObservable = this.translationObservableResolver('coreDatePicker.dateRangeInputLabel');

    dateRangeInputLabelSync = this.translationSyncResolver('coreDatePicker.dateRangeInputLabel');

    dateRangeInputLabelSignal = this.translationSignalResolver('coreDatePicker.dateRangeInputLabel');
}
