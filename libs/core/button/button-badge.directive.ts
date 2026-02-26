import { Directive, ElementRef, effect, inject, input, isDevMode } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { BaseButton, ButtonType } from './base-button';
import { FD_BUTTON_COMPONENT } from './tokens';

export const badgeEnabledButtonTypes: ButtonType[] = ['emphasized', 'standard', 'ghost', 'transparent'];

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-button-badge',
    host: {
        class: 'fd-button__badge'
    }
})
export class ButtonBadgeDirective implements HasElementRef {
    /**
     * Content, which should be shown inside the Badge.
     * It should not be longer than 4 characters.
     */
    readonly content = input<string | number>();

    /** @hidden */
    readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    protected readonly buttonComponent = inject<BaseButton>(FD_BUTTON_COMPONENT, { host: true });

    /** @hidden */
    constructor() {
        // Automatically update badge content when content signal changes
        effect(() => {
            this.elementRef.nativeElement.innerHTML = `${this.content()}` || '';

            if (isDevMode()) {
                const contentValue = this.content();
                if (contentValue) {
                    if (contentValue.toString().length > 4) {
                        console.warn('Badge content should not be longer than 4 characters');
                    }
                }

                if (badgeEnabledButtonTypes.indexOf(this.buttonComponent.getFdType()) === -1) {
                    console.warn(
                        `Currently the ${JSON.stringify(
                            badgeEnabledButtonTypes
                        )} type of buttons are required for Badge enablement`
                    );
                }
            }
        });
    }
}
