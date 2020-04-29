import { ChangeDetectorRef, Component, Inject, Input, Optional, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from '../../dialog/dialog-utils/dialog-config.class';

@Component({
    selector: 'fd-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    styleUrls: ['./multi-input-mobile.component.scss']
})
export class MultiInputMobileComponent {

    @Input()
    listTemplate: TemplateRef<any>;

    @Input()
    controlTemplate: TemplateRef<any>;

    @ViewChild('template', { read: TemplateRef })
    template: TemplateRef<any>;

    constructor(
        @Optional() private dialogService: DialogService,
        @Optional() @Inject(DIALOG_DEFAULT_CONFIG) private _defaultConfig: DialogConfig,
        private _changeDetRef: ChangeDetectorRef
    ) {}

    open(): void {
        this._defaultConfig.defaultObject.content = this.template;
        this._defaultConfig.defaultObject.approveButtonCallback = () => {this.dialogService.dismissAll(); this.dialogs()};
        this._defaultConfig.defaultObject.cancelButtonCallback = () => {this.dialogService.dismissAll(); this.dialogs()};
        this._defaultConfig.defaultObject.closeButtonCallback = () => {this.dialogService.dismissAll(); this.dialogs()};
        this.dialogService.open(
            this._defaultConfig.defaultObject,
            this._defaultConfig
        )
    }

    hasOpenDialogs(): boolean {
        return this.dialogService && this.dialogService.hasOpenDialogs()
    }

    dialogs(): void {
        this._changeDetRef.detectChanges();
    }

}
