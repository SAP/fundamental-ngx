import { Directive, inject, OnChanges, OnInit } from '@angular/core';
import { ButtonComponent, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';

@Directive()
export abstract class ButtonTypeGuard implements OnInit, OnChanges {
    /** Type of the button. */
    abstract fdType: string;

    /** @hidden */
    protected _buttonComponent = inject<ButtonComponent>(FD_BUTTON_COMPONENT, { host: true });

    /** @hidden */
    ngOnInit(): void {
        this._buttonComponent.fdType = this.fdType as any;
        this._buttonComponent.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this._buttonComponent.fdType = this.fdType as any;
        this._buttonComponent.buildComponentCssClass();
    }
}
