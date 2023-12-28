import { DestroyRef, Directive, ElementRef, InjectionToken, inject } from '@angular/core';
import { MOBILE_CONFIG_ERROR } from '@fundamental-ngx/cdk/utils';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { MobileMode } from './mobile-control.interface';
import { MobileModeConfig } from './mobile-mode-config';

export const MOBILE_MODE_CONFIG = new InjectionToken<MobileModeConfigToken>(
    'Provides configuration for mobile control'
);

export interface MobileModeConfigToken {
    target: MobileModeControl;
    config: MobileModeConfig;
}

export enum MobileModeControl {
    MENU = 'MENU',
    SELECT = 'SELECT',
    POPOVER = 'POPOVER',
    COMBOBOX = 'COMBOBOX',
    MULTI_INPUT = 'MULTI_INPUT',
    MULTI_COMBOBOX = 'MULTI_COMBOBOX',
    SEARCH_FIELD = 'SEARCH_FIELD',
    DATE_PICKER = 'DATE_PICKER',
    DATETIME_PICKER = 'DATETIME_PICKER'
}

@Directive()
export abstract class MobileModeBase<T extends MobileMode> {
    /** @hidden */
    dialogRef: DialogRef;

    /** @hidden */
    dialogConfig?: DialogConfig;

    /** @hidden */
    mobileConfig: MobileModeConfig;

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        protected _elementRef: ElementRef,
        protected _dialogService: DialogService,
        protected _component: T,
        protected readonly target: MobileModeControl,
        private readonly _mobileModes: MobileModeConfigToken[]
    ) {
        this._mobileModes = this._mobileModes || [];
        this.mobileConfig = this._getMobileModeConfig();
        this.dialogConfig = this.mobileConfig.dialogConfig;
    }

    /** @hidden */
    private _getMobileModeConfig(): MobileModeConfig {
        const injectedConfig = this._mobileModes.find((mode) => mode.target === this.target);

        if (injectedConfig || this._component.mobileConfig) {
            return injectedConfig
                ? this._mergeConfigs(injectedConfig.config || {}, this._component.mobileConfig || {})
                : this._component.mobileConfig;
        } else {
            throw new Error(MOBILE_CONFIG_ERROR);
        }
    }

    /** @hidden New mobile mode config as a merge of config1 and config2. */
    private _mergeConfigs(config1: MobileModeConfig, config2: MobileModeConfig): MobileModeConfig {
        return {
            ...config1,
            ...config2,
            dialogConfig: {
                ...(config1.dialogConfig && config1.dialogConfig),
                ...(config2.dialogConfig && config2.dialogConfig)
            }
        };
    }
}
