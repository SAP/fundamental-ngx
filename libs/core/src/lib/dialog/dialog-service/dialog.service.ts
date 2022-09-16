import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from '../utils/dialog-config.class';
import { DynamicComponentService, RtlService } from '@fundamental-ngx/core/utils';
import { DialogRef } from '../utils/dialog-ref.class';
import { DialogBaseService } from '../base/dialog-base.service';
import { DialogContentType } from '../dialog.types';

/** Service used to create a dialog. */
@Injectable()
export class DialogService extends DialogBaseService<DialogContainerComponent> {
    /** @hidden */
    constructor(
        @Inject(DynamicComponentService) dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(DIALOG_DEFAULT_CONFIG) private _defaultConfig: DialogConfig,
        @Optional() private _rtlService: RtlService,
        private _injector: Injector
    ) {
        super(dynamicComponentService);
    }

    /**
     * Opens a dialog component with provided content.
     * @param content Content of the dialog component.
     * @param dialogConfig Configuration of the dialog component.
     * @param parentInjector Parent injector instance.
     */
    public open<T = any>(
        content: DialogContentType,
        dialogConfig?: DialogConfig<T>,
        parentInjector?: Injector
    ): DialogRef<T> {
        const dialogRef = new DialogRef();
        if (!parentInjector) {
            parentInjector = this._injector;
        }

        dialogConfig = this._applyDefaultConfig(dialogConfig || {}, this._defaultConfig || new DialogConfig());
        dialogRef.data = dialogConfig.data;

        const injector = Injector.create({
            providers: [
                { provide: DialogConfig, useValue: dialogConfig },
                { provide: DialogRef, useValue: dialogRef },
                { provide: RtlService, useValue: this._rtlService },
                { provide: DialogService, useValue: this }
            ],
            parent: parentInjector
        });

        const component = this._dynamicComponentService.createDynamicComponent<DialogContainerComponent>(
            content,
            DialogContainerComponent,
            dialogConfig,
            { injector }
        );

        this._dialogs.push(component);

        const defaultBehaviourOnClose = (): void => {
            this._destroyDialog(component);
            refSub.unsubscribe();
        };

        const refSub = dialogRef.afterClosed.subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);

        return dialogRef;
    }
}
