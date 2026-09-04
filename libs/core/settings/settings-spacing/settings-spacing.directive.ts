import { Directive, computed, input } from '@angular/core';

export type SettingsSpacingSize = 'small' | 'medium' | 'large' | 'form' | undefined;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-spacing]',
    host: {
        '[class]': 'cssClass()',
        role: 'presentation',
        'aria-hidden': 'true'
    },
    standalone: true
})
export class SettingsSpacingDirective {
    size = input<SettingsSpacingSize>();

    protected readonly cssClass = computed(() => {
        const sizeValue = this.size();

        return ['fd-settings__spacing', sizeValue ? `fd-settings__spacing--${sizeValue}` : '']
            .filter(Boolean)
            .join(' ');
    });
}
