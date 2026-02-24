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
    readonly dialogConfig?: DialogConfig;

    /** @hidden */
    readonly mobileConfig: MobileModeConfig;

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    protected readonly _elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly _dialogService = inject(DialogService);

    /** @hidden */
    private readonly _mobileModes = inject<MobileModeConfigToken[]>(MOBILE_MODE_CONFIG, { optional: true }) || [];

    /** @hidden */
    constructor(
        protected _component: T,
        protected readonly target: MobileModeControl
    ) {
        this.mobileConfig = this._getMobileModeConfig();
        this.dialogConfig = this.mobileConfig.dialogConfig;
    }

    /** @hidden */
    private _getMobileModeConfig(): MobileModeConfig {
        const injectedConfig = this._mobileModes.find((mode) => mode.target === this.target);
        const componentConfig = this._component.mobileConfig;

        if (!injectedConfig && !componentConfig) {
            throw new Error(MOBILE_CONFIG_ERROR);
        }

        if (injectedConfig && componentConfig) {
            return this._mergeConfigs(injectedConfig.config, componentConfig);
        }

        return (injectedConfig?.config || componentConfig)!;
    }

    /** @hidden Merges two mobile mode configs, with config2 taking precedence. */
    private _mergeConfigs(config1: MobileModeConfig, config2: MobileModeConfig): MobileModeConfig {
        return {
            ...config1,
            ...config2,
            dialogConfig: {
                ...config1.dialogConfig,
                ...config2.dialogConfig
            }
        };
    }
}
