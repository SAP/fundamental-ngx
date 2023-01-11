import { ComponentRef } from '@angular/core';

import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogConfigBase } from './dialog-config-base.class';
import { DialogRefBase } from './dialog-ref-base.class';

/** Service used to dynamically generate a dialog. */
export abstract class DialogBaseService<T> {
    /** @hidden Collection of existing dialog references */
    protected _dialogs: ComponentRef<T>[] = [];

    /** @hidden */
    constructor(protected _dynamicComponentService: DynamicComponentService) {}

    /**
     * Status of the dialog service.
     * Returns true if there are open dialogs, false otherwise.
     */
    hasOpenDialogs(): boolean {
        return this._dialogs && this._dialogs.length > 0;
    }

    /** Dismisses all currently open dialogs. */
    dismissAll(): void {
        this._dialogs.forEach((item) => this._destroyDialog(item));
    }

    abstract open<D>(content: unknown, config: DialogConfigBase<D>): DialogRefBase<D>;

    /** @hidden Extends configuration using default values*/
    protected _applyDefaultConfig(config: DialogConfig, defaultConfig: DialogConfig): DialogConfig {
        return { ...defaultConfig, ...config };
    }

    /** @hidden Destroy existing dialog */
    protected _destroyDialog(dialog: ComponentRef<T>): void {
        this._dynamicComponentService.destroyComponent(dialog);
        this._dialogs = this._dialogs.filter((d) => d !== dialog);
    }
}
