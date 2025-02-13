import { Directive, booleanAttribute, input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-content]',
    host: {
        class: 'fd-settings__content',
        '[class.fd-settings__content--no-background]': 'noBackground()',
        '[class.fd-settings__content--no-padding]': 'noPadding()'
    },
    standalone: true
})
export class SettingsContentDirective {
    /**
     * Whether the content should be without paddings.
     * Default value is false.
     */

    noPadding = input(false, { transform: booleanAttribute });

    /**
     * Whether the content should be without background.
     * Default value is false.
     */
    noBackground = input(false, { transform: booleanAttribute });
}
