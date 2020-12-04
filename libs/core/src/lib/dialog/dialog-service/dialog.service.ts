import { Inject, Injectable, Injector, Optional, TemplateRef, Type } from '@angular/core';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DIALOG_CONFIG, DIALOG_DEFAULT_CONFIG, DialogConfig } from '../utils/dialog-config.class';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { DIALOG_REF, DialogRef } from '../utils/dialog-ref.class';
import { DialogBaseService } from '../base/dialog-base.service';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';

export type DialogContentType = TemplateRef<any> | Type<any> | DialogDefaultContent;

/** Service used to create a dialog. */
@Injectable()
export class DialogService extends DialogBaseService<DialogContainerComponent> {

    /** @hidden */
    constructor(
        @Inject(DynamicComponentService) dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(DIALOG_DEFAULT_CONFIG) private _defaultConfig: DialogConfig
    ) {
        super(dynamicComponentService)
    }

    /**
     * Opens a dialog component with with provided content.
     * @param content Content of the dialog component.
     * @param dialogConfig Configuration of the dialog component.
     */
    public open<T = any>(content: DialogContentType, dialogConfig?: DialogConfig<T>): DialogRef<T> {
        const dialogRef = new DialogRef();

        dialogConfig = this._applyDefaultConfig(dialogConfig, this._defaultConfig || new DialogConfig());
        dialogRef.data = dialogConfig.data;

        const injector = Injector.create({
            providers: [
                { provide: DIALOG_CONFIG, useValue: dialogConfig },
                { provide: DIALOG_REF, useValue: dialogRef }
            ]
        });

        const component = this._dynamicComponentService.createDynamicComponent<DialogContainerComponent>
        (
            content,
            DialogContainerComponent,
            dialogConfig,
            { injector: injector }
        );

        this._dialogs.push(component);

        const defaultBehaviourOnClose = () => {
            this._destroyDialog(component);
            refSub.unsubscribe();
        };

        const refSub = dialogRef.afterClosed.subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);

        return dialogRef;
    }
}
