import { Directive, ElementRef, inject, Input, isDevMode, OnChanges } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { BaseButton, ButtonType } from './base-button';
import { FD_BUTTON_COMPONENT } from './tokens';

export const badgeEnabledButtonTypes: ButtonType[] = ['emphasized', 'standard', 'ghost', 'transparent'];

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-button-badge',
    host: {
        class: 'fd-button__badge'
    },
    standalone: true
})
export class ButtonBadgeDirective implements OnChanges, HasElementRef {
    /**
     * Content, which should be shown inside the Badge.
     * It should not be longer than 4 characters.
     */
    @Input()
    content: string | number;

    /** @hidden */
    _buttonComponent = inject<BaseButton>(FD_BUTTON_COMPONENT, { host: true });

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    ngOnChanges(): void {
        this.elementRef.nativeElement.innerHTML = `${this.content}` || '';
        if (isDevMode()) {
            if (this.content && this.content.toString().length > 4) {
                console.warn('Badge content should not be longer than 4 characters');
            }
            if (badgeEnabledButtonTypes.indexOf(this._buttonComponent.fdType) === -1) {
                console.warn(
                    `Currently the ${JSON.stringify(
                        badgeEnabledButtonTypes
                    )} type of buttons are required for Badge enablement`
                );
            }
        }
    }
}
