import { ComponentRef, DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogContainer } from '../utils/dialog-container.model';
import { DialogConfigBase } from './dialog-config-base.class';
import { DialogRefBase, FD_DIALOG_DISMISS_REASON } from './dialog-ref-base.class';

/** Service used to dynamically generate a dialog. */
@Injectable()
export abstract class DialogBaseService<T extends DialogContainer<any>> {
    abstract open<D>(content: unknown, config: DialogConfigBase<D>): DialogRefBase<D>;

    /** @hidden mutable dialogs signal */
    readonly dialogsSignal = signal<ComponentRef<T>[]>([]);

    /**
     * Readonly signal containing all currently open dialog component references.
     * Use this to observe the list of active dialogs.
     */
    readonly dialogs = this.dialogsSignal.asReadonly();

    /**
     * Computed signal indicating whether any dialogs are currently open.
     * Useful for conditional logic based on dialog presence.
     */
    readonly hasOpenDialogs = computed(() => this.dialogs().length > 0);

    /** Computed: count of open dialogs */
    readonly openDialogCount = computed(() => this.dialogs().length);

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        // Auto-cleanup all dialogs when service is destroyed
        this._destroyRef.onDestroy(() => {
            this.dismissAll(FD_DIALOG_DISMISS_REASON.SERVICE_DESTROYED);
        });
    }

    /** Dismisses all currently open dialogs. */
    dismissAll(reason?: FD_DIALOG_DISMISS_REASON | string): void {
        const dialogs = [...this.dialogsSignal()];
        dialogs.forEach((item) => {
            try {
                item.instance.ref?.dismiss(reason);
            } catch (e) {
                console.error('Error dismissing dialog:', e);
            }
            try {
                item.destroy();
            } catch (e) {
                console.error('Error destroying dialog:', e);
            }
        });
        this.dialogsSignal.set([]);
    }

    /** @hidden Extends configuration using default values */
    protected _applyDefaultConfig(config: DialogConfig, defaultConfig: DialogConfig): DialogConfig {
        return { ...defaultConfig, ...config };
    }

    /** @hidden Register a dialog and setup auto-cleanup */
    protected _registerDialog(dialog: ComponentRef<T>): void {
        this.dialogsSignal.update((dialogs) => [...dialogs, dialog]);

        // Auto-remove when dialog closes
        dialog.instance.ref.afterClosed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
            next: () => this._destroyDialog(dialog),
            error: () => this._destroyDialog(dialog)
        });
    }

    /** @hidden Destroy existing dialog */
    protected _destroyDialog(dialog: ComponentRef<T>): void {
        this.dialogsSignal.update((dialogs) => dialogs.filter((d) => d !== dialog));

        try {
            dialog.destroy();
        } catch (e) {
            console.error('Error destroying dialog:', e);
        }
    }
}
