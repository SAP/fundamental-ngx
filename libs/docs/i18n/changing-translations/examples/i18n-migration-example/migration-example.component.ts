import { Component, WritableSignal, computed, inject, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_SIGNAL,
    FD_LANGUAGE_UKRAINIAN,
    FdLanguage,
    resolveTranslationSignal,
    resolveTranslationSignalFn
} from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-migration-example',
    templateUrl: './migration-example.component.html',
    standalone: true,
    imports: [ButtonComponent, FormLabelComponent, MessageStripComponent],
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class MigrationExampleComponent {
    /**
     * MODERN APPROACH: Using Signal-based APIs
     *
     * ✅ Better performance (pure pipe vs impure pipe)
     * ✅ Automatic cleanup (no subscriptions)
     * ✅ Zoneless compatible
     * ✅ Simpler API
     */

    // 1. Inject the language SIGNAL (not Observable!)
    private readonly languageSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    private readonly translateFn = resolveTranslationSignalFn();

    // 2. Use resolveTranslationSignal() for reactive translations
    // eslint-disable-next-line @typescript-eslint/member-ordering
    readonly saveButtonLabel = resolveTranslationSignal('coreDatePicker.dateInputLabel');
    // eslint-disable-next-line @typescript-eslint/member-ordering
    readonly cancelButtonLabel = resolveTranslationSignal('coreShellbar.cancel');

    // 3. For complex logic, use computed signals
    // eslint-disable-next-line @typescript-eslint/member-ordering
    readonly statusMessage = computed(() => {
        const lang = this.languageSignal();
        // You can add any logic here - it's just a computed signal!
        return lang === FD_LANGUAGE_ENGLISH ? 'Status: Active' : 'Статус: Активний';
    });

    // 4. Use factory function when you need to resolve outside injection context
    // eslint-disable-next-line @typescript-eslint/member-ordering
    readonly dynamicLabel = this.translateFn('coreDatePicker.dateRangeInputLabel');

    // 5. Change language at runtime - simple .set() method
    switchToUkrainian(): void {
        this.languageSignal.set(FD_LANGUAGE_UKRAINIAN);
    }

    switchToEnglish(): void {
        this.languageSignal.set(FD_LANGUAGE_ENGLISH);
    }

    /**
     * MIGRATION NOTES:
     *
     * OLD WAY (DEPRECATED):
     * ❌ import { FD_LANGUAGE } from '@fundamental-ngx/i18n';
     * ❌ import { BehaviorSubject } from 'rxjs';
     * ❌ providers: [{ provide: FD_LANGUAGE, useValue: new BehaviorSubject(...) }]
     * ❌ constructor(@Inject(FD_LANGUAGE) private lang$: BehaviorSubject<FdLanguage>) {}
     * ❌ this.lang$.next(newLanguage);  // Change language
     * ❌ this.lang$.subscribe(...)      // React to changes (manual cleanup needed!)
     *
     * NEW WAY (RECOMMENDED):
     * ✅ import { FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
     * ✅ import { signal } from '@angular/core';
     * ✅ providers: [{ provide: FD_LANGUAGE_SIGNAL, useValue: signal(...) }]
     * ✅ private langSignal = inject(FD_LANGUAGE_SIGNAL);
     * ✅ this.langSignal.set(newLanguage);  // Change language
     * ✅ computed(() => this.langSignal()) // React to changes (automatic cleanup!)
     */
}
