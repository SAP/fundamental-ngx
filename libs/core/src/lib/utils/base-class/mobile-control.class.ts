import { ElementRef, isDevMode, TemplateRef, ViewChild } from '@angular/core';
import { DialogConfig } from '../../dialog/dialog-utils/dialog-config.class';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { MobileControl } from '../interfaces/mobile-control.interface';
import { MOBILE_CONFIG_ERROR } from '../consts';
import { Subject } from 'rxjs';

export abstract class MobileControlBase<T> {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    dialogRef: DialogRef;

    /** @hidden */
    mobileModeConfig: MobileModeConfig;

    /** @hidden */
    protected readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        protected _elementRef: ElementRef,
        protected _dialogService: DialogService,
        protected _component: MobileControl & T) {

        this.mobileModeConfig = this._getMobileModeConfig();
    }

    /** @hidden */
    get dialogConfig(): DialogConfig {
        return this.mobileModeConfig.dialogConfig || {};
    }

    /** @hidden */
    private _getMobileModeConfig(): MobileModeConfig {
        if (this._component.mobileConfig) {
            return this._component.mobileConfig;
        } else {
            if (isDevMode()) {
                throw new Error(MOBILE_CONFIG_ERROR);
            }
        }
    }
}
