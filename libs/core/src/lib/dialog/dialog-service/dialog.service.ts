import { ComponentRef, Inject, Injectable, Injector, Optional, TemplateRef, Type } from '@angular/core';
import { DialogComponent } from '../dialog.component';
import { DialogContainerComponent } from '../dialog-utils/dialog-container.component';
import { DIALOG_CONFIG, DIALOG_DEFAULT_CONFIG, DialogConfig } from '../dialog-utils/dialog-config.class';
import { DialogPosition } from '../dialog-utils/dialog-position.class';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { DIALOG_REF, DialogRef } from '../dialog-utils/dialog-ref.class';

/** Service used to dynamically generate a dialog. */
@Injectable()
export class DialogService {

    /** @hidden Collection of existing dialog references */
    private _dialogs: ComponentRef<DialogContainerComponent>[] = [];

    constructor(
        @Inject(DynamicComponentService) private _dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(DIALOG_DEFAULT_CONFIG) private _defaultConfig: DialogConfig
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
        this._dialogs.forEach(item => this._destroyDialogComponent(item));
    }

    /**
     * Opens a dialog component with a content of type TemplateRef or a component type.
     * @param contentType Content of the dialog component.
     * @param dialogConfig Configuration of the dialog component.
     */
    public open(contentType: Type<any> | TemplateRef<any>, dialogConfig?: DialogConfig): DialogRef {


        dialogConfig = this._applyDefaultConfig(dialogConfig, this._defaultConfig || new DialogConfig());

        const dialogRef: DialogRef = new DialogRef();
        dialogRef.data = dialogConfig.data;

        const dialogInjector = Injector.create({
            providers: [
                {provide: DIALOG_CONFIG, useValue: dialogConfig},
                {provide: DIALOG_REF, useValue: dialogRef}
            ]
        });

        const component: ComponentRef<DialogContainerComponent> = this._dynamicComponentService
            .createDynamicComponent<DialogContainerComponent>(
                contentType,
                DialogContainerComponent,
                dialogConfig,
                {
                    injector: dialogInjector
                }
            );

        // const dialogInjector = Injector.create({providers: [], parent: overlayInjector});
        // const component = this._dynamicComponentService.createDynamicComponent<DialogComponent>(
        //     contentType,
        //     DialogComponent,
        //     {...dialogConfig, container: backdrop.location.nativeElement},
        //     {
        //         injector: dialogInjector,
        //         services: [dialogRef]
        //     }
        // );

        // this._setDialogSize(component, dialogConfig);
        // this._setDialogPosition(component, dialogConfig.position);

        this._dialogs.push(component);

        const defaultBehaviourOnClose = () => {
            this._destroyDialogComponent(component);
            refSub.unsubscribe();
        };

        const refSub = dialogRef.afterClosed.subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);

        return dialogRef;
    }

    /** @hidden */
    private _destroyDialogComponent(dialog: ComponentRef<DialogContainerComponent>): void {

        const arrayRef = this._dialogs.find((item) => item === dialog);
        const indexOf = this._dialogs.indexOf(arrayRef);
        this._dynamicComponentService.destroyComponent(arrayRef);
        arrayRef.destroy();

        this._dialogs[indexOf] = null;
        this._dialogs = this._dialogs.filter(item => item !== null && item !== undefined);

    }

    /** @hidden */
    private _setDialogSize(componentRef: ComponentRef<DialogComponent>, configObj: DialogConfig): void {
        componentRef.location.nativeElement.style.minWidth = configObj.minWidth;
        componentRef.location.nativeElement.style.minHeight = configObj.minHeight;
        componentRef.location.nativeElement.style.maxWidth = configObj.maxWidth;
        componentRef.location.nativeElement.style.maxHeight = configObj.maxHeight;
        componentRef.location.nativeElement.style.width = configObj.width;
        componentRef.location.nativeElement.style.height = configObj.height;
    }

    /** @hidden */
    private _setDialogPosition(componentRef: ComponentRef<DialogComponent>, position: DialogPosition): void {
        if (position) {
            this._removeCurrentPositionModifiers(componentRef, position);
            componentRef.location.nativeElement.style.top = position.top;
            componentRef.location.nativeElement.style.bottom = position.bottom;
            componentRef.location.nativeElement.style.right = position.right;
            componentRef.location.nativeElement.style.left = position.left;
        }
    }

    /** @hidden */
    private _removeCurrentPositionModifiers(componentRef: ComponentRef<DialogComponent>, position: DialogPosition): void {

        const isXPositionSet: boolean = !!(position.right || position.left);
        const isYPositionSet: boolean = !!(position.bottom || position.top);

        if (isYPositionSet) {
            componentRef.location.nativeElement.style.top = 'auto';
            componentRef.location.nativeElement.style.bottom = 'auto';
            componentRef.location.nativeElement.style.transform = 'translate(-50%, 0)';
        }

        if (isXPositionSet) {
            componentRef.location.nativeElement.style.right = 'auto';
            componentRef.location.nativeElement.style.left = 'auto';
            componentRef.location.nativeElement.style.transform = 'translate(0, -50%)';
        }

        if (isXPositionSet && isYPositionSet) {
            componentRef.location.nativeElement.style.transform = 'translate(0, 0)'
        }
    }

    /** @hidden Extends dialog config using default values and returns JS DialogConfig object*/
    private _applyDefaultConfig(config: DialogConfig, defaultConfig: DialogConfig): DialogConfig {
        const newConfig = new DialogConfig();
        const mergedConfigs = {...defaultConfig, ...config};
        Object.keys(mergedConfigs).forEach(key => newConfig[key] = mergedConfigs[key]);

        return newConfig;
    }
}
