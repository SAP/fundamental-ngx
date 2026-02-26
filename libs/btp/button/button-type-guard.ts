import { Directive, effect, inject, Signal } from '@angular/core';
import { ButtonComponent, ButtonType, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';

@Directive()
export abstract class ButtonTypeGuard {
    /** Type of the button. */
    abstract readonly fdType: Signal<ButtonType | undefined>;

    /** @hidden */
    protected readonly buttonComponent = inject<ButtonComponent>(FD_BUTTON_COMPONENT, { host: true });

    /** @hidden */
    constructor() {
        // Automatically update button type when fdType signal changes
        effect(() => {
            const type = this.fdType();
            if (type) {
                this.buttonComponent.setFdType(type);
            }
        });
    }
}
