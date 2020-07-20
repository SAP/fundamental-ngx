import { ElementRef, InjectionToken, isDevMode, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { DialogConfig } from '../../dialog/dialog-utils/dialog-config.class';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { MobileMode } from '../interfaces/mobile-control.interface';
import { MOBILE_CONFIG_ERROR } from '../consts';
import { Subject } from 'rxjs';

export enum MobileModeControlName {
    SELECT = 'SELECT',
    COMBOBOX = 'COMBOBOX',
    MULTI_INPUT = 'MULTI_INPUT'
}

export interface MobileModeToken {
    controlName: MobileModeControlName,
    config: MobileModeConfig;
}

export const MOBILE_MODE_CONFIG = new InjectionToken<MobileModeToken>('Provides configuration for mobile control');

export abstract class MobileModeBase<T> implements OnDestroy {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    dialogRef: DialogRef;

    /** @hidden */
    mobileConfig: MobileModeConfig;

    /** @hidden */
    protected readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        protected _elementRef: ElementRef,
        protected _dialogService: DialogService,
        protected _component: MobileMode & T,
        protected readonly controlName: MobileModeControlName,
        private _mobileModes: MobileModeToken[]) {
        this.mobileConfig = this._getMobileModeConfig();
    }

    /** @hidden */
    get dialogConfig(): DialogConfig {
        return this.mobileConfig.dialogConfig || {};
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private _getMobileModeConfig(): MobileModeConfig {
        if (this._component.mobileConfig) {
            const injectedConfig = this._mobileModes.find(mode => mode.controlName === this.controlName);

            return this._component.mobileConfig;
        } else {
            if (isDevMode()) {
                throw new Error(MOBILE_CONFIG_ERROR);
            }
        }
    }
}
