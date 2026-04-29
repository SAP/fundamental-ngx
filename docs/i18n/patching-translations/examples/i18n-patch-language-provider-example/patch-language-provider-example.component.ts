import { Component } from '@angular/core';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { patchLanguage } from '@fundamental-ngx/i18n';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

/**
 * REAL-WORLD EXAMPLE: Multi-tenant Application
 *
 * Scenario: You have a SaaS application where different customers
 * want slightly different wording for the same features.
 *
 * Instead of using fdPatchLanguage directive on every component,
 * you can use patchLanguage() at the component/module level to
 * override translations for an entire scope.
 */

@Component({
    selector: 'fd-patch-language-provider-example',
    templateUrl: './patch-language-provider-example.component.html',
    standalone: true,
    imports: [MessageStripComponent, PlatformTextAreaModule],
    providers: [
        /**
         * patchLanguage() function creates a provider that overrides
         * translations for THIS COMPONENT and all its children.
         *
         * Use cases:
         * - Multi-tenant apps (different customers, different wording)
         * - Locale-specific variations (US English vs. UK English)
         * - A/B testing different copy
         * - Feature-flagged experimental wording
         */
        patchLanguage({
            // Override textarea counter messages for this component scope
            platformTextarea: {
                counterMessageCharactersRemainingSingular: '1 character left',
                counterMessageCharactersRemainingPlural: '{count} characters left',
                counterMessageCharactersOverTheLimitSingular: 'Too long by 1 character!',
                counterMessageCharactersOverTheLimitPlural: 'Too long by {count} characters!'
            }
        })
    ]
})
export class PatchLanguageProviderExampleComponent {
    textValue = 'Type here to see custom character counter messages...';

    /**
     * COMPARISON: Directive vs. Provider
     *
     * DIRECTIVE APPROACH (per-element):
     * <div [fdPatchLanguage]="{ platformTextarea: { ... } }">
     *   <fdp-textarea></fdp-textarea>
     * </div>
     *
     * PROVIDER APPROACH (entire component/module scope):
     * providers: [patchLanguage({ platformTextarea: { ... } })]
     *
     * When to use PROVIDER:
     * ✅ Multiple components need same patches
     * ✅ Want to patch entire module/route
     * ✅ Cleaner code (no template clutter)
     *
     * When to use DIRECTIVE:
     * ✅ Only one specific element needs patching
     * ✅ Dynamic patches based on template data
     * ✅ Conditional patches
     */
}
