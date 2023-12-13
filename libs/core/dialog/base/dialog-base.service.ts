import { ComponentRef, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogContainer } from '../utils/dialog-container.model';
import { DialogConfigBase } from './dialog-config-base.class';
import { DialogRefBase } from './dialog-ref-base.class';

/** Service used to dynamically generate a dialog. */
@Injectable()
export abstract class DialogBaseService<T extends DialogContainer<any>> implements OnDestroy {
    abstract open<D>(content: unknown, config: DialogConfigBase<D>): DialogRefBase<D>;
    /** @ignore Collection of existing dialog references */
    protected _dialogs: ComponentRef<T>[] = [];

    /** @ignore */
    protected _destroy$ = new Subject<void>();

    /**
     * Status of the dialog service.
     * Returns true if there are open dialogs, false otherwise.
     */
    hasOpenDialogs(): boolean {
        return this._dialogs && this._dialogs.length > 0;
    }

    /** Dismisses all currently open dialogs. */
    dismissAll(reason?: any): void {
        this._dialogs.forEach((item) => {
            item.instance.ref.dismiss(reason);
            item.destroy();
        });
        this._dialogs = [];
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    /** @ignore Extends configuration using default values*/
    protected _applyDefaultConfig(config: DialogConfig, defaultConfig: DialogConfig): DialogConfig {
        return { ...defaultConfig, ...config };
    }

    /** @ignore Destroy existing dialog */
    protected _destroyDialog(dialog: ComponentRef<T>): void {
        this._dialogs = this._dialogs.filter((d) => d !== dialog);
    }
}
