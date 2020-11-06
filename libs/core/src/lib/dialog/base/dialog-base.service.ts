import { ComponentRef, Injector, TemplateRef, Type } from '@angular/core';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DIALOG_CONFIG, DialogConfig } from '../dialog-utils/dialog-config.class';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { DIALOG_REF, DialogRef } from '../dialog-utils/dialog-ref.class';
import { DefaultDialogObject } from '../default-dialog/default-dialog-object';
import { DialogRefBase } from './dialog-ref-base.class';

/** Service used to dynamically generate a dialog. */
export abstract class DialogBaseService<T> {
    /** @hidden Collection of existing dialog references */
    private _dialogs: ComponentRef<T>[] = [];

    constructor(
        private _dynamicComponentService: DynamicComponentService,
        private _defaultConfig: DialogConfig
    ) {}

    /**
     * Status of the dialog service.
     * Returns true if there are open dialogs, false otherwise.
     */
    public hasOpenDialogs(): boolean {
        return this._dialogs && this._dialogs.length > 0;
    }

    /** Dismisses all currently open dialogs. */
    public dismissAll(): void {
        this._dialogs.forEach((item) => this._destroyDialogComponent(item));
    }

    /**
     * Opens a dialog component with a content of type TemplateRef or a component type.
     * @param contentType Content of the dialog component.
     * @param dialogConfig Configuration of the dialog component.
     */
    public abstract open<D>(contentType: Type<T> | TemplateRef<T> | DefaultDialogObject, dialogConfig?: DialogConfig): any;

    /** @hidden Destroy existing Dialog */
    private _destroyDialogComponent(dialog: ComponentRef<T>): void {
        const arrayRef = this._dialogs.find((item) => item === dialog);
        const indexOf = this._dialogs.indexOf(arrayRef);
        this._dynamicComponentService.destroyComponent(arrayRef);
        arrayRef.destroy();

        this._dialogs[indexOf] = null;
        this._dialogs = this._dialogs.filter((item) => item !== null && item !== undefined);
    }

    /** @hidden Extends dialog config using default values*/
    private _applyDefaultConfig(config: DialogConfig, defaultConfig: DialogConfig): DialogConfig {
        return {...defaultConfig, ...config};
    }
}
