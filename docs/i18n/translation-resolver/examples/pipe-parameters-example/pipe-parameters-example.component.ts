import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { FD_LANGUAGE_ENGLISH, FD_LANGUAGE_SIGNAL, FdTranslatePipe } from '@fundamental-ngx/i18n';

/**
 * REAL-WORLD EXAMPLE: E-commerce Shopping Cart
 *
 * This example shows how to use the fdTranslate pipe with:
 * - Object parameters (for dynamic values like counts, names)
 * - Default fallback text (for missing translations)
 * - Null key handling (for optional translations)
 * - Complex pluralization patterns
 */

@Component({
    selector: 'fd-pipe-parameters-example',
    templateUrl: './pipe-parameters-example.component.html',
    standalone: true,
    imports: [ButtonComponent, FormLabelComponent, MessageStripComponent, FdTranslatePipe, FormsModule],
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class PipeParametersExampleComponent {
    // Shopping cart state
    itemCount = signal(3);
    userName = signal('Alex');
    itemPrice = signal(29.99);

    // Example of optional translation key (might be null)
    promoCode = signal<string | null>('SAVE20');

    incrementItems(): void {
        this.itemCount.update((count) => count + 1);
    }

    decrementItems(): void {
        this.itemCount.update((count) => Math.max(0, count - 1));
    }

    clearPromo(): void {
        this.promoCode.set(null);
    }

    applyPromo(): void {
        this.promoCode.set('SAVE20');
    }

    /**
     * PIPE PARAMETER PATTERNS:
     *
     * 1. BASIC (no parameters):
     *    {{ ('coreButton.save' | fdTranslate)() }}
     *
     * 2. WITH OBJECT PARAMETERS:
     *    {{ ('cart.itemCount' | fdTranslate: { count: itemCount() })() }}
     *    Translation: "You have {count} items in cart"
     *
     * 3. WITH DEFAULT VALUE (fallback):
     *    {{ ('optional.key' | fdTranslate: {}: 'Fallback Text')() }}
     *    If 'optional.key' doesn't exist, shows 'Fallback Text'
     *
     * 4. WITH NULL KEY (handles gracefully):
     *    {{ (nullKey | fdTranslate: {}: 'Default')() }}
     *    Shows 'Default' when key is null
     *
     * 5. MULTIPLE PARAMETERS:
     *    {{ ('welcome.message' | fdTranslate: { name: userName(), count: itemCount() })() }}
     *    Translation: "Welcome {name}! You have {count} items"
     *
     * Note: The pipe returns Signal<string>, so always invoke with ()!
     */
}
