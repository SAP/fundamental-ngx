import { ComponentRef, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogConfigBase } from './dialog-config-base.class';
import { DialogRefBase } from './dialog-ref-base.class';

/** Service used to dynamically generate a dialog. */
@Injectable()
export abstract class DialogBaseService<T> implements OnDestroy {
    /** @hidden Collection of existing dialog references */
    protected _dialogs: ComponentRef<T>[] = [];

    /** @hidden */
    protected _destroy$ = new Subject<void>();

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

    /** @hidden */
    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    abstract open<D>(content: unknown, config: DialogConfigBase<D>): DialogRefBase<D>;

    /** @hidden Extends configuration using default values*/
    protected _applyDefaultConfig(config: DialogConfig, defaultConfig: DialogConfig): DialogConfig {
        return { ...defaultConfig, ...config };
    }

    /** @hidden Destroy existing dialog */
    protected _destroyDialog(dialog: ComponentRef<T>): void {
        this._dialogs = this._dialogs.filter((d) => d !== dialog);
    }
}
